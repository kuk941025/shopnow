import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteBorder";
import Skeleton from "@material-ui/lab/Skeleton";
import Strings from "../../libs/strings";
import { localString } from "../../libs/utils";

const ProductItem = ({ onClick, onFavClick, data, favorited = false }) => {
    const classes = useStyles();
    const ShowSkeleton = () => {
        return (
            <div className={classes.imgRoot}>
                <Skeleton variant="rect" width="100%" height={200} />
                <div className={classes.contentRootSkeleton}>
                    <Skeleton variant="rect" width={150} height={30} />
                    <Skeleton variant="circle" style={{ marginLeft: 'auto' }} height={32} width={32} />
                </div>
                <div className={classes.contentRootSkeleton}>
                    <Skeleton variant="rect" width={230} />
                </div>
            </div>
        )
    }
    return (
        <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card elevation={1} className={classes.root}>
                {data.loading ? <ShowSkeleton /> :
                    <>
                        <CardActionArea onClick={onClick}>
                            <div variant="body1" className={classes.imgRoot}>
                                <img alt="product_img" className={classes.img}
                                    src={data.image} />
                                <Typography className={classes.titleRoot} >
                                    {data.title}
                                </Typography>
                            </div>
                        </CardActionArea>
                        <div className={classes.contentRoot}>
                            <div>
                                <Typography variant="body1" className={classes.price}>
                                    {`${Number(data.lprice).toLocaleString()}${localString(Strings.item_won)}`}
                                </Typography>
                                <IconButton onClick={() => onFavClick(data)}>
                                    {favorited ?
                                        <FavoriteIcon className={classes.icon} />
                                        :
                                        <FavoriteOutlinedIcon className={classes.icon} />
                                    }
                                </IconButton>
                            </div>
                            <div >
                                <Typography variant="body1" noWrap className={classes.category}>
                                    {data.category1}
                                </Typography>
                                <Typography className={classes.category} variant="body1" style={{ padding: `0px 4px` }}>
                                    /
                                </Typography>
                                <Typography variant="body1" noWrap className={classes.category}>
                                    {data.category2}
                                </Typography>
                            </div>
                        </div>
                    </>
                }

            </Card>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 300,
        "& img": {
            width: '100%',
            height: 200,
            objectFit: 'contain'
        }
    },
    imgRoot: {
        height: 200,
    },
    price: {
        color: theme.palette.primary.dark,
    },
    titleRoot: {
        position: 'relative',
        top: -20,
        padding: `${theme.spacing(.5)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
        fontWeight: 600,
        backgroundColor: 'white',
        fontSize: '1.1rem',
        borderRadius: `0px 7.5px 7.5px 0px`,
        width: '80%',
        height: 32,
        overflow: 'hidden'
    },
    contentRoot: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
        "& div": {
            display: 'flex',
            alignItems: 'center',
        },
        "& button": {
            marginLeft: 'auto'
        }
    },
    category: {
        fontSize: '0.9rem'
    },
    icon: {
        color: theme.palette.secondary.light
    },
    contentRootSkeleton: {
        display: 'flex',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0px ${theme.spacing(2)}px`,
    }
}))
export default ProductItem;