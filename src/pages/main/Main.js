import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grey from "@material-ui/core/colors/grey";
import Toolbar from "../../layouts/toolbar/Toolbar";
import Drawer from "../../layouts/drawer/Drawer";

const Main = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    return (
        <div className={classes.root}>
            <Toolbar onToggle={() => setMobileOpen(!mobileOpen)} />
            <Drawer onToggle={() => setMobileOpen(!mobileOpen)} mobileOpen={mobileOpen} />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: Grey['100'],
        minHeight: '100vh',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}))
export default Main;