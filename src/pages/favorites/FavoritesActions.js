import db from "../../libs/db";
import { analytics } from "../../libs/fbconfig";

export const FavoriteActionType = {
    "load": "LoadShopNowFavorites",
    "add": "AddShopNowFavorites",
    "remove": "RemoveShopNowFavorites"
}

export const getFavorites = () => async dispatch => {
    const items = [];

    await db.favorites.each(item => {
        items.push(item)
    })

    dispatch({ type: FavoriteActionType.load, data: items });
}

export const addFavorite = (product) => async (dispatch, getState) => {
    const { user_data } = getState().settings;
    await db.favorites.put({
        ...product,
        created_at: new Date(),
    });

    const { created_at, loading, image, link, ...productData } = product;
    
    analytics.logEvent("favorited", {
        product: productData,
        user_data, 
    })
    dispatch({ type: FavoriteActionType.add, data: product });
}

export const removeFavorite = product => async (dispatch, getState) => {
    const { productId } = product;
    const { user_data } = getState().settings;

    await db.favorites.delete(productId);

    const { created_at, loading, image, link, ...productData } = product;
    analytics.logEvent("unfavorited", {
        product: productData,
        user_data
    })
    dispatch({ type: FavoriteActionType.remove, data: product })
}