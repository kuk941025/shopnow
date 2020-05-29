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
import ErrorPage from "../error_page/ErrorPage";
import { localString } from "../../libs/utils";
import Strings from "../../libs/strings";
import Typography from "@material-ui/core/Typography";

const Search = ({ location, history }) => {
    const dispatch = useDispatch();
    const [favlist, setFavlist] = useState(null);
    const [err, setErr] = useState(false);
    const { results, completed } = useSelector(state => state.search);

    useEffect(() => {
        const { query } = qs.parse(location.search);

        //error
        if (!query) {
            setErr(true);
            return;
        }
        dispatch(search(query));
    }, [location])

    useEffect(() => {
        //initalized favlist with results.favorited value
        setFavlist(results.map(result => result.favorited));
    }, [results])

    const handleFavClick = (product, idx) => {
        if (!favlist) return;

        if (favlist[idx]) {
            dispatch(removeFavorite(product))
            setFavlist(update(favlist, {
                [idx]: { $set: false }
            }))
        }
        else {
            dispatch(addFavorite(product));
            setFavlist(update(favlist, {
                [idx]: { $set: true }
            }))
        }
    }

    if (err)
        return <ErrorPage
            msg={localString(Strings.err_msg_unknown)}
            btn={{ msg: localString(Strings.err_go_back), onClick: () => history.goBack() }}
        />

    if (completed && results.length === 0)
        return (
            <div>
                <Typography variant="body1" align="center">
                    {localString(Strings.search_not_found)}
                </Typography>
            </div>
        )
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