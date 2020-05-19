import { SettingsActionType } from "./SettingsActions";

const initState = {
    loading: true,
    categories: [],
    user_data: null, 
    err: {
        value: false,
        msg: ''
    }
}

const SettingsReducer = (state = initState, action) => {
    switch (action.type) {
        case SettingsActionType.request:
            return {
                ...state,
                loading: true
            }
        case SettingsActionType.response:
            return {
                ...state,
                loading: false,
                categories: action.data,
                err: {
                    value: false,
                    msg: '', 
                }
            }
        case SettingsActionType.setUser:
            return {
                ...state,
                user_data: action.data
            }
        case SettingsActionType.errNetwork:
            return {
                ...state,
                err: {
                    value: true, 
                    msg: "Network Error"
                }
            }
        default:
            return state;
    }
}

export default SettingsReducer;
