import React, { useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";
import { getFavorites, removeFavorite } from "./FavoritesActions";
import { useDispatch, useSelector } from "react-redux";

let productItems = [];
const setProductItems = () => {
    for (let i = 0; i < 20; i++) {
        productItems.push({
            loading: true,
            title: 'Product Name ' + i,
            lprice: '1500'
        });
    }
}
setProductItems();

const Favorites = ({ history }) => {
    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.favorite);

    useEffect(() => {
        dispatch(getFavorites());
    }, [dispatch])

    const handleFavorite = product => {
        dispatch(removeFavorite(product));
    }

    return (

        <Grid container spacing={3}>
            {favorites.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at))).map((item, idx) => (
                <ProductItem
                    favorited={true}
                    onFavClick={() => handleFavorite(item)}
                    data={item}
                    onClick={() => history.push(`${URLs.ProductDetail}?product_id=${item.productId}`)}
                    key={item.productId} />
            ))}
        </Grid>

    )
}

export default withRouter(Favorites)