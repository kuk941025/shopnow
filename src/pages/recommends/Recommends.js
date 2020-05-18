import React, { useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";
import { useDispatch, useSelector } from "react-redux";
import { getRecommends } from "./RecommendsActions";


const Recommends = ({ history }) => {
    const dispatch = useDispatch();
    const recommendsData = useSelector(state => state.recommends.data);
    useEffect(() => {
        dispatch(getRecommends());
    }, [dispatch]);

    useEffect(() => {
        let temp = {};
        recommendsData.forEach(item => {
            temp[item.productId] = item
        });

    }, [recommendsData])
    return (
        <Grid container spacing={3}>
            {recommendsData.map((product) => (
                <ProductItem
                    data={product}
                    onClick={() => history.push(`${URLs.ProductDetail}?product_id=${product.productId}`)}
                    key={product.productId} />
            ))}
        </Grid>
    )
}

export default withRouter(Recommends)