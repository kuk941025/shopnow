import React from 'react'
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../layouts/productitem/ProductItem";

let productItems = [];
const setProductItems = () => {
    for (let i = 0; i < 20; i++) productItems.push(i);
}
setProductItems();

const Search = () => {
    return (
        <Grid container spacing={3}>
            {productItems.map((item, idx) => (
                <ProductItem key={idx} />
            ))}
        </Grid>
    )
}

export default Search;