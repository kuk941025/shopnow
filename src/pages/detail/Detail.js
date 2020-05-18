import React, { useEffect, useState, useLayoutEffect } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import classNames from 'classnames';
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import { DrawerWidth } from "../../libs/const";
import Strings from "../../libs/strings";
import { localString } from "../../libs/utils";
import { useSelector } from "react-redux";
const tempCategory = ["Category1", "Category2", "Category3"];


const Detail = ({ location }) => {
    const classes = useStyles();
    const theme = useTheme();
    const recommendData = useSelector(state => state.recommends.data);
    const [productID, setProductId] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [product, setProduct] = useState(null);

    //listen whether drawer is visible or not.
    useLayoutEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            if (width > theme.breakpoints.values['sm']) {
                setDrawerVisible(false);
            }
            else setDrawerVisible(true);
        }
        window.addEventListener('resize', updateLayout);
        updateLayout();
        return () => window.removeEventListener('resize', updateLayout);
    }, [theme])


    useEffect(() => {
        const { product_id } = qs.parse(location.search);
        let selected = recommendData.find(item => item.productId === product_id);
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
                productType: productTypeString
            });
        } catch (err) {
            setProduct(null);
        }
    }, [location])

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
                <SwipeableViews enableMouseEvents>
                    {tempCategory.map(category => (
                        <img
                            key={category}
                            alt="next_items"
                            className={classes.nextImg}
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"

                        />
                    ))}
                </SwipeableViews>
                {drawerVisible ?
                    <Button color="primary" fullWidth className={classes.btnNoDrawer} variant="contained" >
                        {localString(Strings.detail_favorite)}
                    </Button>
                    :
                    <Button color="primary" className={classes.btnDrawer} variant="contained" disableElevation>
                        {localString(Strings.detail_favorite)}
                    </Button>
                }

            </Grid>
        </Grid>

    )
}

const useStyles = makeStyles(theme => ({
    item: {
        [theme.breakpoints.up('md')]: {
            height: `calc(100vh - 100px)`,
        },
    },
    itemImg: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
        },
    },
    itemDescrp: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    img: {
        width: '100%',

        [theme.breakpoints.down('md')]: {
            paddingTop: `${theme.spacing(2)}px`,
        },
    },
    root: {
        backgroundColor: 'white',
        [theme.breakpoints.down('md')]: {
            paddingBottom: 50,
        }
    },
    title: {
        fontWeight: 600,
        fontSize: '1.5rem'
    },
    nextItems: {
        marginTop: theme.spacing(3),
        fontWeight: 600,
        fontSize: '1.2rem',
    },
    nextImg: {
        width: '100%',
        height: 250,
        objectFit: 'contain'
    },
    flexRoot: {
        display: 'flex',
        width: '100%',
    },
    category: {
        fontSize: '0.9rem'
    },
    categoryDash: {
        color: theme.palette.secondary.main
    },
    price: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    btnNoDrawer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        borderRadius: 3,
    },
    btnDrawer: {
        [theme.breakpoints.down('md')]: {
            position: 'fixed',
            left: DrawerWidth,
            bottom: 0,
            width: `calc(100% - ${DrawerWidth}px)`
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 'auto',
            position: 'inherit',
            width: '100%'
        },
        borderRadius: 3,
    }
}))
export default withRouter(Detail);