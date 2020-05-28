import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import { search } from "./SearchActions";
import { useDispatch, useSelector } from "react-redux";
import URLs from "../../libs/urls";
import { addFavorite, removeFavorite } from "../favorites/FavoritesActions";
import update from "immutability-helper";

const Search = ({ location, history }) => {
    const dispatch = useDispatch();
    const [ favlist, setFavlist] = useState(null);
    const { results } = useSelector(state => state.search);
    
    useEffect(() => {
        const { query } = qs.parse(location.search);

        //error
        if (!query) return;
        dispatch(search(query));

    }, [location])

    useEffect(() => {
        //initalized favlist with results.favorited value
        setFavlist(results.map(result => result.favorited));
    }, [results])

    const handleFavClick = (product, idx) => {
        if (!favlist) return;

        if (favlist[idx]){
            dispatch(removeFavorite(product))
            setFavlist(update(favlist, {
                [idx]: {$set: false}
            }))
        }
        else {
            dispatch(addFavorite(product));
            setFavlist(update(favlist, {
                [idx]: {$set: true}
            }))
        }
    }

    return (
        <Grid container spacing={3}>
            {results.map((product, idx) => (
                <ProductItem
                    favorited={favlist && favlist[idx] ? true : false}
                    data={product}
                    onClick={() => history.push(`${URLs.ProductDetail}?product_id=${product.productId}`)}
                    key={product.productId}
                    onFavClick={product => handleFavClick(product, idx)}
                />
            ))}
        </Grid>
    )
}

export default withRouter(Search);