const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });
const Categories = require("./config/Categories");
const serviceAccount = require('./config/shopnow-118fe-firebase-adminsdk-4q7or-418bf11061.json');
const admin = require('firebase-admin');
const moment = require('moment-timezone');
const { Client_ID, Client_Secret, baseURL } = require("./config/Const");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://shopnow-118fe.firebaseio.com"
});

const db = admin.firestore();



/**
 * top 5 items => 20 each search result
 * A total of 100 items is returned to client
 * 
 * 
 */
exports.getRecommends = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { categories, gender, age, date } = req.query;
        if (!categories || !gender || !age || !date) {
            res.status(400).send({
                success: false,
                msg: "query missing"
            });
            return;
        }

        let category_ids = categories.split(",");

        //let query_date = moment(date, "YYYY-MM-DD").tz("Asia/Seoul").subtract(1, "day").format("YYYY-MM-DD");
        try {
            let trends_promises = [];
            category_ids.forEach(category_id => {
                trends_promises.push(
                    db.collection(`categories/${category_id}/trends/`).orderBy("created_at", "desc").limit(1).get()
                )
            });

            let trends_snap = await Promise.all(trends_promises);
            let top_trends = [];

            trends_snap.forEach((snap, idx) => {
                let trend_data = snap.docs[0].data();
                
                if (gender === "m") {
                    top_trends.push({
                        ...trend_data.male.find(male_data => male_data.group === age),
                        name: trend_data.name[1],
                        cat_id: category_ids[idx]
                    })
                }
                else {
                    top_trends.push({
                        ...trend_data.felmale.find(female_data => female_data.group === age),
                        name: trend_data.name[1],
                        cat_id: category_ids[idx]
                    })
                }
            })

            top_trends.sort((a, b) => a.ratio < b.ratio);
            top_trends = top_trends.slice(0, 5);

            let top_promises = [];
            top_trends.forEach(trend => {
                top_promises.push(
                    axios.get(`${baseURL}/search/shop.json`, {
                        "params": {
                            "query": trend.name,
                            "display": 20
                        },
                        "headers": {
                            "Content-Type": "application/json",
                            "X-Naver-Client-Id": Client_ID,
                            "X-Naver-Client-Secret": Client_Secret
                        }
                    })
                )
            })

            let top_snaps = await Promise.all(top_promises);
            let results = [];

            top_snaps.forEach(top => {
                top.data.items.forEach(item => results.push(item));
            })

            return res.send({
                success: true,
                data: results
            });

        } catch (err) {
            console.log(err);
            return res.status(400).send({
                success: false,
                msg: err
            })
        }
    });
})


//Daily update trends by calling Datalab API
exports.updateTrends = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const cur_date = new Date();
            let categories_resp = await db.collection('categories').get();
            let categories_data = [];
            
            for (let doc of categories_resp.docs) {
                if (doc.id === "root") {
                    main_categories = doc.data().main_categories;
                }
                else categories_data.push({ id: doc.id, ...doc.data() });
            }

            const date = moment().tz("Asia/Seoul").subtract("1", "day").format('YYYY-MM-DD');
            let promises = [];

            for (let category of categories_data) {
                ["m", "f"].forEach(gender => {
                    promises.push(
                        axios.post(`${baseURL}/datalab/shopping/category/age`, {
                            "startDate": date,
                            "endDate": date,
                            "timeUnit": "date",
                            "category": category.cat_id,
                            "gender": gender,
                            "ages": []
                        }, {
                            "headers": {
                                "Content-Type": "application/json",
                                "X-Naver-Client-Id": Client_ID,
                                "X-Naver-Client-Secret": Client_Secret
                            }
                        })
                    );
                });
            }
            let promises_snaps = await Promise.all(promises);


            let batch = db.batch();

            let idx = 0;
            for (let category of categories_data) {
                let male_data = promises_snaps[idx].data.results[0].data;
                let female_data = promises_snaps[idx + 1].data.results[0].data;

                if (male_data.length === 0 || female_data.length === 0) continue;
                batch.set(db.doc(`categories/${category.id}/trends/${date}`), {
                    male: male_data,
                    felmale: female_data,
                    name: category.name,
                    created_at: cur_date 
                });

                idx += 2;
            }
            await batch.commit();
            res.send({ success: true });

        } catch (err) {
            console.log(err);
            res.send({ success: false, err: err });
        }
    })

})

exports.setCategories = functions.https.onRequest(async (req, res) => {

    let batch = db.batch();
    let root_field = [];

    Categories.forEach((main_category, m_idx) => {
        root_field.push({ title: main_category.title });
        main_category.categories.forEach(sub_category => {
            batch.set(db.collection('categories').doc(sub_category.cat_id), {
                ...sub_category,
                idx: m_idx
            })
        })
    });

    db.doc(`categories/root`).set({
        main_categories: root_field
    })
    // batch.set(db.doc(`categories/root`), {
    //     main_categories: root_field
    // });

    await batch.commit();
    res.send("success");
})

exports.getCategories = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            let category_snap = await db.collection('categories').get();
            let categories = [];
            let main_categories;
            category_snap.forEach(category_doc => {
                let data = category_doc.data()
                if (category_doc.id === "root") {
                    main_categories = data.main_categories
                }
                else categories.push(data)
            })

            let results = []
            main_categories.forEach(main => {
                results.push({
                    title: main.title,
                    categories: []
                })
            });

            categories.forEach(category => {
                let { idx, ...other } = category;
                results[idx].categories.push(other);
            });

            res.send({
                success: true,
                data: results,
            })
        } catch (err) {
            res.send({
                success: false,
                msg: err
            })
        }
    })
})