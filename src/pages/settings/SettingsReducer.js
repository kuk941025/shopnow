import { SettingsActionType } from "./SettingsActions";

const initState = {
    loading: true,
    categories: [],
    user_data: null, 
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
                categories: action.data
            }
        case SettingsActionType.setUser:
            return {
                ...state,
                user_data: action.data
            }
        default:
            return state;
    }
}

export default SettingsReducer;
