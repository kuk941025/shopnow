import axios from "axios";
import { BaseURL } from "../../libs/const";
import { analytics } from "../../libs/fbconfig";

export const SettingsActionType = {
    request: "requestCategory",
    response: "responseCategory",
    setUser: "setUserData",
    errNetwork: "errNetworkCategory",
    notPrecached: 'categoryNotPrecached'
}


export const getCategories = () => async dispatch => {
    try {
        dispatch({ type: SettingsActionType.request });
        let resp = await axios.get(`${BaseURL}/getCategories`);

        let { data } = resp.data;
        dispatch({ type: SettingsActionType.response, data });

    } catch (err) {
        dispatch({ type: SettingsActionType.errNetwork });

    }
}

export const setUserData = (data) => dispatch => {
    analytics.logEvent("user setting", data);
    dispatch({ type: SettingsActionType.setUser, data });
}

export const categoryNotPrecached = () => dispatch => {
    dispatch({ type: SettingsActionType.notPrecached });
}