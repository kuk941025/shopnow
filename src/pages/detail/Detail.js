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
const tempCategory = ["Category1", "Category2", "Category3"];


const Detail = ({ location }) => {
    const [productID, setProductId] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const classes = useStyles();
    const theme = useTheme();

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
        setProductId(product_id);
    }, [location])

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
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"
                />
            </Grid>
            <Grid item className={classNames(classes.item, classes.itemDescrp)} xs={12} md={6}>
                <Typography varaint="body1" className={classes.title}>
                    Title
                </Typography>
                <div className={classes.flexRoot}>
                    <Typography className={classes.price} variant="body1">
                        Price
                    </Typography>
                    <Typography style={{ marginLeft: 'auto' }} variant="body1">
                        Marker/Brand
                    </Typography>
                </div>
                <Typography variant="body1">
                    Product Type
                </Typography>
                <div className={classNames(classes.flexRoot)}>
                    {tempCategory.map(category => (
                        <React.Fragment key={category}>
                            <Typography className={classes.category} varaint="body1">
                                {category}
                            </Typography>
                            <Typography className={classes.category} style={{ margin: `0px 4px` }}>
                                /
                            </Typography>
                        </React.Fragment>
                    ))}
                </div>
                <Typography varaint="body1" className={classes.nextItems}>
                    Next Items
                </Typography>
                <SwipeableViews className={classes.nextItems} enableMouseEvents>
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
                    <Button color="primary" fullWidth className={classes.btnNoDrawer} variant="contained" disableElevation>
                        Favorite
                    </Button>
                    :
                    <Button color="primary" className={classes.btnDrawer} variant="contained" disableElevation>
                        Favorite
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
        }
    },
    itemDescrp: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    img: {
        width: '100%',
    },
    root: {
        backgroundColor: 'white',
        [theme.breakpoints.down('md')]: {
            paddingBottom: 50,
        }
    },
    title: {
        fontWeight: 600,
        marginTop: theme.spacing(2),
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

    price: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    btnNoDrawer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        borderRadius: 0,
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
        borderRadius: 0,
    }
}))
export default withRouter(Detail);