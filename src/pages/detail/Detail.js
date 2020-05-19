import React, { useEffect, useState, useLayoutEffect } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from 'classnames';
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import Strings from "../../libs/strings";
import { localString } from "../../libs/utils";
import { useSelector } from "react-redux";
import URLs from "../../libs/urls";
import Skeleton from "@material-ui/lab/Skeleton";
import DetailCss from "./DetailCss";
import DetailSkeleton from "./DetailSkeleton";

const Detail = ({ location, history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const recommendData = useSelector(state => state.recommends.data);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [product, setProduct] = useState(null);

    //listen whether drawer is visible or not.
    useLayoutEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            if (width > theme.breakpoints.values['sm']) {
                setDrawerVisible(true);
            }
            else setDrawerVisible(false);
        }
        window.addEventListener('resize', updateLayout);
        updateLayout();
        return () => window.removeEventListener('resize', updateLayout);
    }, [theme])


    useEffect(() => {
        const { product_id } = qs.parse(location.search);
        const selectedIdx = recommendData.findIndex(item => item.productId === product_id);
        let selected = recommendData[selectedIdx]
        let productTypeString = "";
        try {
            let productType = Number(selected.productType);
            if (productType >= 10)
                productTypeString = localString(Strings.detail_coming_soon_product);
            else if (productType >= 7)
                productTypeString = localString(Strings.detail_discontinued_product);
            else if (productType >= 4)
                productTypeString = localString(Strings.detail_used_product);
            else
                productTypeString = localString(Strings.detail_general_product);

            setProduct({
                ...selected,
                productType: productTypeString,
                selectedIdx: selectedIdx,
            });

        } catch (err) {
            setProduct(null);
        }
    }, [location])


    // return <DetailSkeleton drawerVisible={drawerVisible} />
    if (!product) return null;
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid
                item
                className={classNames(classes.item, classes.itemImg)}
                xs={12}
                md={6}>
                <img
                    alt="product_detail"
                    className={classes.img}
                    src={product.image}
                />
            </Grid>
            <Grid item className={classNames(classes.item, classes.itemDescrp)} xs={12} md={6}>
                <Typography varaint="body1" className={classes.title}>
                    {product.title}
                </Typography>
                <div className={classes.flexRoot}>
                    <Typography className={classes.price} variant="body1">
                        {`${Number(product.lprice).toLocaleString()}~${Number(product.hprice).toLocaleString()}`}
                        {` ${localString(Strings.item_won)}`}
                    </Typography>
                    <Typography style={{ marginLeft: 'auto' }} variant="body1">
                        {`${product.maker}/${product.brand === '' ? localString(Strings.detail_NA) : product.brand}`}
                    </Typography>
                </div>
                <Typography variant="body1">
                    {product.productType}
                </Typography>
                <div className={classNames(classes.flexRoot)}>
                    <Typography className={classes.category} varaint="body1">
                        {product.category1}
                    </Typography>
                    <Typography className={classNames(classes.category, classes.categoryDash)} style={{ margin: `0px 4px` }}>
                        /
                    </Typography>
                    <Typography className={classes.category} varaint="body1">
                        {product.category2}
                    </Typography>
                    <Typography className={classNames(classes.category, classes.categoryDash)} style={{ margin: `0px 4px` }}>
                        /
                    </Typography>
                    <Typography className={classes.category} varaint="body1">
                        {product.category3}
                    </Typography>

                </div>
                <Typography varaint="body1" className={classes.nextItems}>
                    {localString(Strings.detail_next_items)}
                </Typography>
                <SwipeableViews
                    enableMouseEvents
                    index={product.selectedIdx > 0 ? product.selectedIdx - 1 : product.selectedIdx}>
                    {recommendData.filter((next, idx) => idx !== product.selectedIdx).map(next_item => (
                        <div className={classes.nextItemRoot} >
                            <img
                                key={next_item.productId}
                                alt="next_items"
                                src={next_item.image}
                                onClick={() => history.push(`${URLs.ProductDetail}?product_id=${next_item.productId}`)}
                            />
                        </div>
                    ))}

                </SwipeableViews>

                {drawerVisible ?
                    <Button color="primary" className={classes.btnDrawer} variant="contained" disableElevation>
                        {localString(Strings.detail_favorite)}
                    </Button>
                    :
                    <Button color="primary" fullWidth className={classes.btnNoDrawer} variant="contained" >
                        {localString(Strings.detail_favorite)}
                    </Button>
                }

            </Grid>
        </Grid>

    )
}

const useStyles = makeStyles(DetailCss);
export default withRouter(Detail);