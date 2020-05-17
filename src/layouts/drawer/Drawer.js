import React from 'react'
import { makeStyles } from "@material-ui/core/styles/";
import MDrawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Grey from "@material-ui/core/colors/grey";
import { DrawerWidth } from "../../libs/const";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Divider from "@material-ui/core/Divider";
import { localString } from "../../libs/utils";
import Strings from "../../libs/strings";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";
import { MainClickType } from "../../pages/main/MainConst";
import Chip from "@material-ui/core/Chip";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
const getIcon = (idx) => {
    if (idx === 0) return <ThumbUpIcon />
    else if (idx === 1) return <FavoriteIcon />
    else return <SettingsIcon />
}

const Drawer = ({ mobileOpen, history, onClick }) => {
    const classes = useStyles();
    const { user_data } = useSelector(state => state.settings);
    const onListItemClicked = (idx) => {
        if (idx === 0) history.push(URLs.Main);
        else if (idx === 1) history.push(URLs.Favorites);
        else history.push(URLs.Settings);
    }


    const getDrawer = () => {
        return (
            <div className={classes.drawerContents}>
                <div className={classes.toolbar}>
                    <Typography variant="h5" className={classes.title}>
                        {`${user_data.age}${localString(Strings.drawer_age)}`}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {localString(user_data.gender === "male" ? Strings.drawer_male : Strings.drawer_female)}
                    </Typography>
                    <div className={classes.categoryRoot}>
                        {user_data.selected_categories.map(category => (
                            <Tooltip key={category.cat_id} title={localString(category.name)} >
                                <Chip className={classes.chip} label={localString(category.name)} variant="outlined" />
                            </Tooltip>
                        ))}

                    </div>
                    <Divider variant="middle" className={classes.divider} />
                    <List>
                        {localString(Strings.drawer_items).map((item, idx) => (
                            <ListItem onClick={() => onListItemClicked(idx)} button key={item}>
                                <ListItemIcon>{getIcon(idx)}</ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>
                </div>

            </div>
        )
    }
    return (
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <MDrawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={() => onClick({ type: MainClickType.Toggle })}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    {getDrawer()}
                </MDrawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <MDrawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                    onClose={() => onClick({ type: MainClickType.Toggle })}
                >
                    {getDrawer()}
                </MDrawer>
            </Hidden>
        </nav>
    )
}

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: DrawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawerContents: {
        backgroundColor: 'white',
        height: '100%',
    },
    listItem: {
        "&:hover": {
            backgroundColor: '#2f3e52'
        }
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: DrawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    title: {
        fontWeight: 600,
    },
    categoryRoot: {
        height: 125,
        overflow: 'auto',
        border: `.5px solid ${Grey['200']}`,
        marginTop: theme.spacing(2),
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        display: 'flex',
        '& > *': {
            margin: `${theme.spacing(0.5)}px 0px`,
        },
    },
    divider: {
        margin: `${theme.spacing(3)}px 0px`
    },
    chip: {
        width: (DrawerWidth - theme.spacing(7)) / 2,
    }
}))
export default withRouter(Drawer);