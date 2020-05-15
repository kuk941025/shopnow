import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grey from "@material-ui/core/colors/grey";
import Toolbar from "../../layouts/toolbar/Toolbar";
import Drawer from "../../layouts/drawer/Drawer";
import ProductItem from "../../layouts/productitem/ProductItem";
import Grid from "@material-ui/core/Grid";

let productItems = [];
const setProductItems = () => {
    for (let i = 0; i < 100; i++) productItems.push(i);
}
setProductItems();

const Main = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <div className={classes.root}>
            <Toolbar onToggle={() => setMobileOpen(!mobileOpen)} />
            <Drawer onToggle={() => setMobileOpen(!mobileOpen)} mobileOpen={mobileOpen} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={3}>
                    {productItems.map((item, idx) => (
                        <ProductItem key={idx} />
                    ))}
                </Grid>
            </main>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: Grey['100'],
        minHeight: '100vh',
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }, 
    toolbar: theme.mixins.toolbar
}))
export default Main;