import db from "../../libs/db";

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

export const addFavorite = (product) => async dispatch => {

    await db.favorites.put({
        ...product,
        created_at: new Date(), 
    });
    dispatch({ type: FavoriteActionType.add, data: product });
}

export const removeFavorite = product => async dispatch => {
    const { productId } = product;

    await db.favorites.delete(productId);
    dispatch({ type: FavoriteActionType.remove, data: product })
}