import React, { useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";
import { useDispatch, useSelector } from "react-redux";
import { getRecommends, RecommendErrorType } from "./RecommendsActions";
import ErrorPage from "../error_page/ErrorPage";
import { localString } from "../../libs/utils";
import Strings from "../../libs/strings";

const Recommends = ({ history }) => {
    const dispatch = useDispatch();
    const recommendState = useSelector(state => state.recommends);

    useEffect(() => {
        dispatch(getRecommends());
    }, [dispatch]);

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
            {recommendState.data.map((product) => (
                <ProductItem
                    data={product}
                    onClick={() => history.push(`${URLs.ProductDetail}?product_id=${product.productId}`)}
                    key={product.productId} />
            ))}
        </Grid>
    )
}

export default withRouter(Recommends)