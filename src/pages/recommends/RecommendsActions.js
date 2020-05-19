import axios from 'axios';
import { BaseURL } from "../../libs/const";
import moment from "moment";

export const RecommendActionTypes = {
    request: 'reqeustRecommends',
    response: 'respRecommends',
    err: 'errRecommends'
}
export const getRecommends = () => async (dispatch, getState) => {
    const state = getState();
    const { user_data } = state.settings;
    const { params } = state.recommends;

    let req_params = {
        gender: user_data.gender === "male" ? "m" : "f",
        date: moment().format("YYYY-MM-DD"),
        age: user_data.age,
        categories: user_data.selected_categories.map(category => category.cat_id).join(",")
    }


    //check if user has already requested getRecommends API with the same parameter
    
    if (params && Object.keys(params).length > 0) {
        //deep comparison beetwen params and req_params
        let is_equal = true
        for (let field of ["gender", "date", "age", "categories"]) {
            if (params[field] !== req_params[field]) is_equal = false;
        }

        if (is_equal) return;
    }



    dispatch({ type: RecommendActionTypes.request });
    try {
        let resp = await axios.get(`${BaseURL}/getRecommends`, {
            "params": req_params
        })

        dispatch({ type: RecommendActionTypes.response, data: resp.data.data, params: req_params });

    } catch (err) {
        console.log(err);
    }

}