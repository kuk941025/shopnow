import React from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { closeMessage } from "./SnackAction";

const Snack = () => {
    const dispatch = useDispatch();
    const { open, msg } = useSelector(state => state.snack);
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={() => dispatch(closeMessage())}>
            <Alert severity="error" elevation={6} variant="filled">
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default Snack;