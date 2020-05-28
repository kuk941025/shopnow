import { FavoriteActionType } from "./FavoritesActions";
import update from "immutability-helper";
const initState = {
    favorites: []
}

const favoritesReducer = (state = initState, action) => {
    switch (action.type) {
        case FavoriteActionType.load:
            return {
                ...state,
                favorites: action.data
            }
        case FavoriteActionType.add:
            return update(state, {
                "favorites": { $push: [action.data] }
            })
        case FavoriteActionType.remove:
            return {
                ...state,
                "favorites": state.favorites.filter(favorite => favorite.productId !== action.data.productId)
            };
        default:
            return state;
    }
}

export default favoritesReducer;