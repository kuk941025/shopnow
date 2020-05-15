import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ErrorIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import { localString } from "../../libs/utils";
import Strings from "../../libs/strings";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const NotFound = ({ history }) => {
    const classes = useStyles();
    console.log(history);
    return (
        <div className={classes.root}>
            <ErrorIcon className={classes.icon} />
            <Typography className={classes.error} variant="body1">
                {localString(Strings.error_wrong_url)}
            </Typography>
            <Button
                size="large"
                color="primary"
                variant="contained"
                disableElevation
                onClick={() => history.goBack()}
                className={classes.button}>
                Go Back
            </Button>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    icon: {
        height: 48,
        width: 48,
        color: theme.palette.secondary.main
    },
    root: {
        display: 'flex',
        minHeight: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    error: {
        marginTop: `${theme.spacing(3)}px`,
        fontSize: '1.1rem'
    },
    button: {
        marginTop: theme.spacing(1),

    }
}))
export default withRouter(NotFound);