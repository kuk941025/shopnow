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
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { addFavorite, removeFavorite } from "../favorites/FavoritesActions";

const DetailErrorType = {
    invalidId: "DetailInvalidProducTID",
    network: "DetailNetworkError"
}
const DetailClickType = {
    back: "DetailBackClicked",
    fav: "DetailFavClicked"
}
const Detail = ({ location, history }) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const recommendState = useSelector(state => state.recommends);
    const favoriteState = useSelector(state => state.favorite);
    const [isFav, setFav] = useState(false);
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
        if (!favoriteState.completed) return;
        if (!detailData.product) return;

        const fidx = favoriteState.favorites.findIndex(favorite => favorite.productId === detailData.product.productId);

        if (fidx >= 0) setFav(true);
        else setFav(false);
    }, [favoriteState, detailData])

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

    const handleClick = action => {
        switch (action.type) {
            case DetailClickType.back:
                history.goBack();
                break;
            case DetailClickType.fav:
                if (isFav)
                    dispatch(removeFavorite(detailData.product));
                else
                    dispatch(addFavorite(detailData.product));

                break;
            default:
                break;
        }
    }

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
                        {product.hprice === "0" ?
                            `${Number(product.lprice).toLocaleString()}` :
                            `${Number(product.lprice).toLocaleString()}~${Number(product.hprice).toLocaleString()}`}
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
                <div className={classes.nextRoot}>
                    <Button
                        className={classes.naviagteBtn}
                        disabled={detailData.selectedIdx === 0 ? true : false} onClick={() => setDetailData({ ...detailData, selectedIdx: detailData.selectedIdx - 1 })}>
                        <NavigateBeforeIcon />
                    </Button>
                    <SwipeableViews
                        index={detailData.selectedIdx < recommendState.data.length - 1 ? detailData.selectedIdx : detailData.selectedIdx - 1}>
                        {recommendState.data.filter((next, idx) => next.productId !== product.productId).map(next_item => (
                            <div key={next_item.productId} className={classes.nextSwipeableRoot} >
                                <img
                                    alt="next_items"
                                    src={next_item.image}
                                    onClick={() => history.push(`${URLs.ProductDetail}?product_id=${next_item.productId}`)}
                                />
                            </div>
                        ))}

                    </SwipeableViews>
                    <Button
                        className={classes.naviagteBtn}
                        disabled={detailData.selectedIdx + 2 >= recommendState.data.length ? true : false} onClick={() => setDetailData({ ...detailData, selectedIdx: detailData.selectedIdx + 1 })}>
                        <NavigateNextIcon />
                    </Button>
                </div>


                {drawerVisible ?
                    <div style={{ marginTop: 'auto' }}>
                        <Hidden implementation="css" mdUp>
                            <div className={classes.btnDrawerFixed}>
                                <Button
                                    onClick={() => handleClick({ type: DetailClickType.back })}
                                    className={classes.btnFav}
                                    variant="contained"
                                    disableElevation>
                                    {localString(Strings.detail_back)}
                                </Button>
                                <Button
                                    color="primary"
                                    className={classes.btnFav}
                                    variant="contained"
                                    onClick={() => handleClick({ type: DetailClickType.fav })}
                                    disableElevation>
                                    {localString(isFav ? Strings.detail_unfavorite : Strings.detail_favorite)}
                                </Button>
                            </div>

                        </Hidden>
                        <Hidden implementation="css" smDown>
                            <div className={classes.btnDrawerNotFixed}>
                                <Button
                                    onClick={() => handleClick({ type: DetailClickType.back })}
                                    className={classes.btnFav}
                                    variant="contained"
                                    disableElevation>
                                    {localString(Strings.detail_back)}
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => handleClick({ type: DetailClickType.fav })}
                                    className={classes.btnFav}
                                    variant="contained"
                                    disableElevation>
                                    {localString(isFav ? Strings.detail_unfavorite : Strings.detail_favorite)}
                                </Button>
                            </div>

                        </Hidden>
                    </div>
                    :
                    <div className={classes.btnNoDrawer}>
                        <Button
                            fullWidth
                            onClick={() => handleClick({ type: DetailClickType.back })}
                            className={classNames(classes.btnFav)}
                            variant="contained" >
                            {localString(Strings.detail_back)}
                        </Button>
                        <Button
                            color="primary"
                            fullWidth
                            onClick={() => handleClick({ type: DetailClickType.fav })}
                            className={classNames(classes.btnFav)}
                            variant="contained" >
                            {localString(isFav ? Strings.detail_unfavorite : Strings.detail_favorite)}
                        </Button>
                    </div>

                }

            </Grid>
        </Grid>

    )
}

const useStyles = makeStyles(DetailCss);
export default withRouter(Detail);