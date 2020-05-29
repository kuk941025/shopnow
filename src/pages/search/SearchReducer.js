import { SearchActionType } from "./SearchActions";

const initState = {
    results: [],
    completed: false
}

const searchReducer = (state = initState, action) => {
    switch (action.type){
        case SearchActionType.search:
            return {
                ...state,
                results: action.data,
                completed: true 
            }
        default: 
            return state;
    }
}

export default searchReducer;