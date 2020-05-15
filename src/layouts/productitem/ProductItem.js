import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const tempCategory = ["Category1", "Category2", "Category3"];
const ProductItem = ({ onClick, onFavClick }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} xl={3}>
            <Card className={classes.root}>
                <CardActionArea onClick={onClick}>
                    <div variant="body1" className={classes.imgRoot}>
                        <img alt="product_img" className={classes.img}
                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg" />
                        <Typography component="span" className={classes.titleRoot} >
                            Product Name
                        </Typography>
                    </div>
                </CardActionArea>
                <div className={classes.contentRoot}>
                    <div>
                        <Typography variant="body1" style={{ fontWeight: 600 }}>
                            Price
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
    }
}))
export default ProductItem;