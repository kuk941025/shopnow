import React, { useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";
import { useDispatch, useSelector } from "react-redux";
import { getRecommends } from "./RecommendsActions";

let productItems = [];
const setProductItems = () => {
    for (let i = 0; i < 20; i++) {
        productItems.push({
            loading: false,
            name: 'Product Name ' + i,
            price: '1500'
        });
    }
}
setProductItems();

const Recommends = ({ history }) => {
    const dispatch = useDispatch();
    const recommendsData = useSelector(state => state.recommends.data);
    useEffect(() => {
        dispatch(getRecommends());
    }, [dispatch]);


    return (
        <Grid container spacing={3}>
            {recommendsData.map((product, idx) => (
                <ProductItem data={product} onClick={() => history.push(`${URLs.ProductDetail}?product_id=${idx}`)} key={idx} />
            ))}
        </Grid>
    )
}

export default withRouter(Recommends)