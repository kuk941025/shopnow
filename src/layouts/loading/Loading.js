import React from 'react'
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
const Loading = ({ loading }) => {
    const classes = useStyles();

    return (
        <div>
            <Backdrop className={classes.Backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    Backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.dark
    }
}))
export default Loading;