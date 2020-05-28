import { SearchActionType } from "./SearchActions";

const initState = {
    results: []
}

const searchReducer = (state = initState, action) => {
    switch (action.type){
        case SearchActionType.search:
            console.log(action.data);
            return {
                ...state,
                results: action.data, 
            }
        default: 
            return state;
    }
}

export default searchReducer;