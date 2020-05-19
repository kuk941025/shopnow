import { RecommendActionTypes, RecommendErrorType } from "./RecommendsActions";
import { v4 as uuidv4 } from 'uuid';

const initState = {
    data: [],
    params: {},
    err: {
        value: false,
        msg: ''
    }, 
}


const recommendsReducer = (state = initState, action) => {
    switch (action.type) {
        case RecommendActionTypes.request:
            const loading_data = [];
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
                params: action.params,
                err: {
                    value: false,
                    msg: ''
                },
                data: action.data.map(item => ({
                    ...item,
                    loading: false, 
                }))
            };
            
        case RecommendActionTypes.errNetwork:
            return {
                ...state,
                err: {
                    value: true, 
                    msg: RecommendErrorType.network
                }
            }
        case RecommendActionTypes.errUnknown:
            return {
                ...state,
                err: {
                    value: true,
                    msg: RecommendErrorType.unknown
                }
            }
        default:
            return state;
    }
}

export default recommendsReducer;