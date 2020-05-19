import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ErrorIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ErrorPage = ({ msg, btn }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <ErrorIcon className={classes.icon} />
            <Typography className={classes.error} variant="body1">
                {msg}
            </Typography>
            <Button
                size="large"
                color="primary"
                variant="contained"
                disableElevation
                onClick={btn.onClick}
                className={classes.button}>
                {btn.msg}
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
export default ErrorPage;