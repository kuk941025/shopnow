import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";

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
    return (
        <Grid container spacing={3}>
            {productItems.map((product, idx) => (
                <ProductItem data={product} onClick={() => history.push(`${URLs.ProductDetail}?product_id=${idx}`)} key={idx} />
            ))}
        </Grid>
    )
}

export default withRouter(Recommends)