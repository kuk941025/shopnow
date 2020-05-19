import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import DetailCss from "./DetailCss";
import classNames from "classnames";

const DetailSkeleton = ({drawerVisible}) => {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid
                item
                className={classNames(classes.item, classes.itemImg)}
                xs={12}
                md={6}
            >
                <Skeleton className={classes.img} style={{ minHeight: 400, }} variant="rect" />
            </Grid>
            <Grid
                item
                className={classNames(classes.item, classes.itemDescrp)}
                xs={12}
                md={6}
            >
                <Skeleton className={classes.title} height={35} variant="rect" />
                <div className={classNames(classes.flexRoot, classes.skelVMargins)} style={{ marginTop: 8 }}>
                    <Skeleton className={classes.price} width={300} variant="rect" />
                    <Skeleton style={{ marginLeft: 'auto' }} width={150} variant="rect" />
                </div>
                <Skeleton className={classes.skelVMargins} width={200} variant="rect" />
                <Skeleton className={classes.skelVMargins} width={250} variant="rect" />
                <Skeleton className={classes.nextItems} width={100} variant="rect" />
                <Skeleton className={classes.nextItemRoot} height={250} variant="rect" />
                {drawerVisible ?
                    <Skeleton className={classes.btnDrawer} width="100%" height={45} variant="rect" /> :
                    <Skeleton style={{position: 'fixed'}} className={classes.btnNoDrawer} width="100%" height={45} variant="rect" />
                }
            </Grid>
        </Grid>
    )
}
const useStyles = makeStyles(DetailCss);
export default DetailSkeleton;