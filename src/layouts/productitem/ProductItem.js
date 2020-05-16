import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Skeleton from "@material-ui/lab/Skeleton";
import Strings from "../../libs/strings";
import { localString } from "../../libs/utils";

const tempCategory = ["Category1", "Category2", "Category3"];
const ProductItem = ({ onClick, onFavClick, data }) => {
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
            <Card className={classes.root}>
                {data.loading ? <ShowSkeleton /> :
                    <>
                        <CardActionArea onClick={onClick}>
                            <div variant="body1" className={classes.imgRoot}>
                                <img alt="product_img" className={classes.img}
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg" />
                                <Typography component="span" className={classes.titleRoot} >
                                    {data.name}
                                </Typography>
                            </div>
                        </CardActionArea>
                        <div className={classes.contentRoot}>
                            <div>
                                <Typography variant="body1" style={{ fontWeight: 600 }}>
                                    {`${data.price } ${localString(Strings.item_won)}`}
                                </Typography>
                                <IconButton>
                                    <FavoriteIcon className={classes.icon} />
                                </IconButton>
                            </div>
                            <div >
                                {tempCategory.map((category, idx) => (
                                    <React.Fragment key={idx} >
                                        <Typography variant="body1" className={classes.category}>
                                            {category}
                                        </Typography>
                                        <Typography className={classes.category} variant="body1" style={{ padding: `0px 4px` }}>
                                            /
                                    </Typography>
                                    </React.Fragment>
                                ))}
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
        }
    },
    imgRoot: {
        height: 200,
    },
    titleRoot: {
        position: 'relative',
        top: -17,
        padding: theme.spacing(1),
        color: 'white',
        fontWeight: 600,
        backgroundColor: theme.palette.primary.main,
        fontSize: '1.1rem'
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