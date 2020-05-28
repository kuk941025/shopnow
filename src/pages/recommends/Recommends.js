import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";
import { useDispatch, useSelector } from "react-redux";
import { getRecommends, RecommendErrorType } from "./RecommendsActions";
import ErrorPage from "../error_page/ErrorPage";
import { localString } from "../../libs/utils";
import Strings from "../../libs/strings";
import { addFavorite, removeFavorite } from "../favorites/FavoritesActions";

const Recommends = ({ history }) => {
    const dispatch = useDispatch();
    const [favlist, setFavlist] = useState(null);
    const recommendState = useSelector(state => state.recommends);
    const favoriteState = useSelector(state => state.favorite);

    useEffect(() => {
        dispatch(getRecommends());
    }, [dispatch]);

    useEffect(() => {
        if (recommendState.completed && favoriteState.completed) {
            let favs = [];
            for (let recommend of recommendState.data) {
                const ridx = favoriteState.favorites.findIndex(favorite => favorite.productId === recommend.productId);

                if (ridx >= 0) favs.push(true);
                else favs.push(false);
            }

            setFavlist(favs);
        }
    }, [recommendState, favoriteState]);

    const handleFavClick = (product, idx) => {
        //if not loaded, return
        if (!favlist) return;

        if (favlist[idx])
            dispatch(removeFavorite(product));
        else 
            dispatch(addFavorite(product));
    }

    if (recommendState.err.value) {
        switch (recommendState.err.msg) {
            case RecommendErrorType.network:
                return <ErrorPage
                    msg={localString(Strings.err_msg_offline)}
                    btn={{ msg: localString(Strings.err_retry), onClick: () => dispatch(getRecommends()) }}
                />

            default:
                return <ErrorPage
                    msg={localString(Strings.err_msg_unknown)}
                    btn={{ msg: localString(Strings.err_retry), onClick: () => dispatch(getRecommends()) }}
                />
        }


    }
    return (
        <Grid container spacing={3}>
            {recommendState.data.map((product, idx) => (
                <ProductItem
                    favorited={favlist && favlist[idx] ? true : false}
                    onFavClick={(product) => handleFavClick(product, idx)}
                    data={product}
                    onClick={() => history.push(`${URLs.ProductDetail}?product_id=${product.productId}`)}
                    key={product.productId} />
            ))}
        </Grid>
    )
}

export default withRouter(Recommends)