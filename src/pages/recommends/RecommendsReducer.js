import { RecommendActionTypes } from "./RecommendsActions";
import { v4 as uuidv4 } from 'uuid';

const initState = {
    data: [],
}


const recommendsReducer = (state = initState, action) => {
    switch (action.type) {
        case RecommendActionTypes.request:
            let loading_data = [];
            for (let i = 0; i < 20; i++){
                loading_data.push({
                    loading: true, 
                    productId: uuidv4() 
                })
            } 
                
            return {
                ...state,
                data: loading_data
            };

        case RecommendActionTypes.response:
            return {
                ...state,
                data: action.data.map(item => ({
                    ...item,
                    loading: false, 
                }))
            };
        default:
            return state;
    }
}

export default recommendsReducer;