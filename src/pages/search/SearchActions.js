export const SearchActionType = {
    search: "searchProductItems"
}

export const search = keyword => (dispatch, getState) => {
    const { recommends, favorite } = getState();
    const recommendData = recommends.data;
    const favoriteData = favorite.favorites;

    //to prevent duplicates from recommend and favorite, use key-value data structure
    const results = {};
    let sidx = 0;
    for (let selection of [recommendData, favoriteData]) {
        for (let data of selection) {
            const { title, brand, maker, category1, category2, category3 } = data;
            if (title.includes(keyword) || brand.includes(keyword) ||
                maker.includes(keyword) || category1.includes(keyword) || category2.includes(keyword) || category3.includes(keyword)){
                    results[data.productId] = {
                        ...data,
                        favorited: sidx === 0 ? false : true
                    }

                }
                
        }
        sidx++;
    }

    dispatch({ type: SearchActionType.search, data: Object.keys(results).map(key => results[key]) })
}