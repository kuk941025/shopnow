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
import DetailCss from "./DetailCss";
import { useDispatch } from "react-redux";
import { getRecommends, RecommendErrorType } from "../recommends/RecommendsActions";
import DetailSkeleton from "./DetailSkeleton";
import ErrorPage from "../error_page/ErrorPage";
import Hidden from "@material-ui/core/Hidden";

const DetailErrorType = {
    invalidId: "DetailInvalidProducTID",
    network: "DetailNetworkError"
}
const Detail = ({ location, history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const recommendState = useSelector(state => state.recommends);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [detailData, setDetailData] = useState({
        product: null,
        productType: '',
        selectedIdx: -1,
        err: {
            value: false,
            msg: '',
        }
    })
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
        let { data, err, completed } = recommendState;

        //if no recommended data, and not requested getRecommends to the server
        if (!completed && data.length === 0) {
            dispatch(getRecommends());
            setDetailData({
                ...detailData,
                err: {
                    value: false,
                    msg: ''
                },
                loaded: false,
            });
            return;
        }
        if (completed) {
            //if error has occured from retrieving recommenddata from server
            if (err.value) {
                setDetailData({
                    ...detailData,
                    err: {
                        value: true,
                        msg: err.msg,
                    },
                    loaded: true
                })
            }
            //if no error, find selected product from given product id
            else {
                const { product_id } = qs.parse(location.search);
                const recommendData = recommendState.data;
                try {
                    const selectedIdx = recommendData.findIndex(item => item.productId === product_id);
                    const selected = recommendData[selectedIdx];
                    let productTypeString = "";

                    const productType = Number(selected.productType);
                    if (productType >= 10)
                        productTypeString = localString(Strings.detail_coming_soon_product);
                    else if (productType >= 7)
                        productTypeString = localString(Strings.detail_discontinued_product);
                    else if (productType >= 4)
                        productTypeString = localString(Strings.detail_used_product);
                    else
                        productTypeString = localString(Strings.detail_general_product);

                    setDetailData({
                        product: selected,
                        productType: productTypeString,
                        selectedIdx,
                        err: {
                            value: false,
                            msg: '',
                        },
                        loaded: true
                    });
                } catch (err) {
                    //if no product id is found from recommended data
                    setDetailData({
                        ...detailData,
                        err: {
                            value: true,
                            msg: DetailErrorType.invalidId
                        },
                        loaded: true
                    });
                    return;
                }
            }
        }

    }, [recommendState, location])



    if (!detailData.loaded)
        return <DetailSkeleton drawerVisible={drawerVisible} />
    if (detailData.err.value) {
        switch (detailData.err.msg) {
            case DetailErrorType.invalidId:
                return (
                    <ErrorPage
                        msg={localString(Strings.err_msg_invalid_product)}
                        btn={{ msg: localString(Strings.err_go_back), onClick: () => history.push(URLs.Main) }}
                    />
                )
            case DetailErrorType.network:
            case RecommendErrorType.network:
                return (
                    <ErrorPage
                        msg={localString(Strings.err_msg_offline)}
                        btn={{ msg: localString(Strings.err_retry), onClick: () => dispatch(getRecommends()) }}
                    />
                )
            case RecommendErrorType.unknown:
            default:
                return (
                    <ErrorPage
                        msg={localString(Strings.err_msg_unknown)}
                        btn={{ msg: localString(Strings.err_retry), onClick: () => dispatch(getRecommends()) }}
                    />
                )
        }
    }

    const { product } = detailData;
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
                    {detailData.productType}
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
                    index={detailData.selectedIdx > 0 ? detailData.selectedIdx - 1 : detailData.selectedIdx}>
                    {recommendState.data.filter((next, idx) => idx !== detailData.selectedIdx).map(next_item => (
                        <div key={next_item.productId} className={classes.nextItemRoot} >
                            <img
                                alt="next_items"
                                src={next_item.image}
                                onClick={() => history.push(`${URLs.ProductDetail}?product_id=${next_item.productId}`)}
                            />
                        </div>
                    ))}

                </SwipeableViews>

                {drawerVisible ?
                    <div style={{marginTop: 'auto'}}>
                        <Hidden implementation="css" mdUp>
                            <Button
                                color="primary"
                                className={classNames(classes.btnDrawerFixed, classes.btnFav)}
                                variant="contained"
                                disableElevation>
                                {localString(Strings.detail_favorite)}
                            </Button>
                        </Hidden>
                        <Hidden implementation="css" smDown> 
                            <Button
                                color="primary"
                                className={classNames(classes.btnDrawerNotFixed, classes.btnFav)}
                                variant="contained"
                                disableElevation>
                                {localString(Strings.detail_favorite)}
                            </Button>
                        </Hidden>
                    </div>
                    :
                    <Button
                        color="primary"
                        fullWidth
                        className={classNames(classes.btnNoDrawer, classes.btnFav)}
                        variant="contained" >
                        {localString(Strings.detail_favorite)}
                    </Button>
                }

            </Grid>
        </Grid>

    )
}

const useStyles = makeStyles(DetailCss);
export default withRouter(Detail);