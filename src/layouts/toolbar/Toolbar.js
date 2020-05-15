import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import MToolbar from "@material-ui/core/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import NotiIcon from "@material-ui/icons/Notifications";
import LangIcon from "@material-ui/icons/Language";
import MenuIcon from '@material-ui/icons/Menu';
import { DrawerWidth } from "../../libs/const";
import Search from "../search/Search";

const Toolbar = ({ onToggle }) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar} elevation={2}>
            <MToolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    className={classes.menuButton}
                    onClick={onToggle}
                >
                    <MenuIcon />
                </IconButton>

                <div className={classes.toolRoot}>
                    <Search />
                    <div >
                        <IconButton>
                            <NotiIcon />
                        </IconButton>
                        <IconButton>
                            <LangIcon />
                        </IconButton>
                    </div>
                </div>
            </MToolbar>
        </AppBar>
    )
}
const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DrawerWidth}px)`,
            marginLeft: DrawerWidth,
        },
        backgroundColor: 'white',
        color: 'black',
        minWidth: 250
    },
    title: {
        fontWeight: 600,
        fontSize: '1.2rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolRoot: {
        display: 'flex',
        width: '100%',
        "& div": {
            "&:last-child": {
                marginLeft: 'auto',
            },
            "&:first-child": {
                marginRight: theme.spacing(1), 
            }
        }
    },

}))
export default Toolbar;