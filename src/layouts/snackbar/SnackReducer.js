import { SnackActionType } from "./SnackAction";

const initState = {
    open: false,
    message: '' 
}

const snackReducer = (state = initState, action) => {
    switch (action.type){
        case SnackActionType.show:
            return {
                ...state,
                open: true,
                msg: action.data
            }
        case SnackActionType.hide:
            return {
                ...state,
                open: false
            }
        default: 
            return state;
    }
}

export default snackReducer;