import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";

let productItems = [];
const setProductItems = () => {
    for (let i = 0; i < 20; i++) {
        productItems.push({
            loading: i % 2 === 0 ? true : false,
            name: 'Product Name ' + i,
            price: '1500'
        });
    }
}
setProductItems();

const Favorites = ({ history }) => {
    return (
        <Grid container spacing={3}>
            {productItems.map((item, idx) => (
                <ProductItem data={item} onClick={() => history.push(`${URLs.ProductDetail}?product_id=${idx}`)} key={idx} />
            ))}
        </Grid>
    )
}

export default withRouter(Favorites)