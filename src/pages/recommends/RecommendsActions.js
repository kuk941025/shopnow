import axios from 'axios';
import { BaseURL } from "../../libs/const";
import moment from "moment";

export const RecommendActionTypes = {
    request: 'reqeustRecommends',
    response: 'respRecommends',
    err: 'errRecommends'
}
export const getRecommends = () => async (dispatch, getState) => {
    const { user_data } = getState().settings;
    dispatch({ type: RecommendActionTypes.request });
    try {
        let resp = await axios.get(`${BaseURL}/getRecommends`, {
            "params": {
                gender: user_data.gender === "male" ? "m" : "f",
                date: moment().format("YYYY-MM-DD"),
                age: user_data.age,
                categories: user_data.selected_categories.map(category => category.cat_id).join(",")
            }
        })
        console.log(resp.data);
        dispatch({ type: RecommendActionTypes.response, data: resp.data.data });
        
    } catch (err) {
        console.log(err);
    }

}