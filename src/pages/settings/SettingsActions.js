import axios from "axios";
import { BaseURL } from "../../libs/const";

export const SettingsActionType = {
    request: "requestCategory",
    response: "responseCategory",
    setUser: "setUserData"
}


export const getCategories = () => async dispatch => {
    try {
        dispatch({ type: SettingsActionType.request });
        let resp = await axios.get(`${BaseURL}/getCategories`);

        let { data } = resp.data;
        dispatch({ type: SettingsActionType.response, data });

    } catch (err) {
        console.log(err);
        alert(err);
    }
}

export const setUserData = (data) => dispatch => {
    dispatch({ type: SettingsActionType.setUser, data });
}