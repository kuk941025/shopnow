import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grey from "@material-ui/core/colors/grey";
import Toolbar from "../../layouts/toolbar/Toolbar";
import Drawer from "../../layouts/drawer/Drawer";
import Recommends from "../recommends/Recommends";
import Favorites from "../favorites/Favorites";
import Detail from "../detail/Detail";
import Search from "../search/Search";
import ErrorPage from "../error_page/ErrorPage";
import URLs from "../../libs/urls";
import LangDialog from "../../layouts/langdialog/LangDialog";
import HistoryPopper from "../../layouts/history_popper/HistoryPopper";
import { MainClickType } from "./MainConst";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { localString, setLangCode } from "../../libs/utils";
import Strings from "../../libs/strings";




const Main = ({ location, history }) => {
    const classes = useStyles();
    const { user_data } = useSelector(state => state.settings);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langDialog, setLangDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    //if user data is not set, redirect to settings
    if (!user_data) return <Redirect to={URLs.Settings} />

    const getContents = () => {
        switch (true) {
            case location.pathname === URLs.Main:
                return <Recommends />
            case location.pathname.includes(URLs.Favorites):
                return <Favorites />
            case location.pathname.includes(URLs.ProductDetail):
                return <Detail />
            case location.pathname.includes(URLs.Search):
                return <Search />
            default:
                return <ErrorPage
                    msg={localString(Strings.err_msg_not_found)}
                    btn={{ msg: localString(Strings.err_go_back), onClick: history.goBack }} />
        }
    }

    const handleClick = action => {
        switch (action.type) {
            case MainClickType.Toggle:
                setMobileOpen(!mobileOpen);
                break;
            case MainClickType.lang:
                setLangDialog(!langDialog);
                break;
            case MainClickType.noti:
                setAnchorEl(Boolean(anchorEl) ? null : action.data);
                break;
            case MainClickType.closeNoti:
                setAnchorEl(null);
                break;
            case MainClickType.closeLang:
                setLangDialog(false);
                break;
            case MainClickType.updateLang:
                setLangCode(action.data);
                break;
            default:
                break;
        }
    }


    return (
        <div className={classes.root}>

            <Toolbar onClick={handleClick} />
            <Drawer onClick={handleClick} mobileOpen={mobileOpen} />

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {getContents()}
            </main>

            <HistoryPopper onClick={handleClick} anchorEl={anchorEl} />
            <LangDialog open={langDialog} handleClick={handleClick} />
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