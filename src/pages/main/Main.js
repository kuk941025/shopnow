import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grey from "@material-ui/core/colors/grey";
import Toolbar from "../../layouts/toolbar/Toolbar";
import Drawer from "../../layouts/drawer/Drawer";
import Recommends from "../recommends/Recommends";
import Favorites from "../favorites/Favorites";
import Detail from "../detail/Detail";
import Search from "../search/Search";
import NotFound from "../notfound/NotFound";
import URLs from "../../libs/urls";

let productItems = [];
const setProductItems = () => {
    for (let i = 0; i < 100; i++) productItems.push(i);
}
setProductItems();

const Main = ({ location }) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const getContents = () => {
        switch (true) {
            case location.pathname.includes(URLs.Main):
                return <Recommends />
            case location.pathname.includes(URLs.Favorites):
                return <Favorites />
            case location.pathname.includes(URLs.ProductDetail):
                return <Detail />
            case location.pathname.includes(URLs.Search):
                return <Search />
            default:
                return <NotFound />
        }
    }

    return (
        <div className={classes.root}>

            <Toolbar onToggle={() => setMobileOpen(!mobileOpen)} />
            <Drawer onToggle={() => setMobileOpen(!mobileOpen)} mobileOpen={mobileOpen} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {getContents()}
            </main>

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: Grey['100'],
        minHeight: '100vh',
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar
}))
export default Main;