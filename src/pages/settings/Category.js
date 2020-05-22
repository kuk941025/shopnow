import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { localString } from "../../libs/utils";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { SettingEvents } from "./SettingsConst";
import classNames from "classnames";

const Category = ({ main_categories, checked = [], onClick, showClose }) => {
    const classes = useStyles();
    return (
        <List
            className={classNames(classes.root, showClose ? classes.rootClose : classes.rootNoClose)}>

            {main_categories && main_categories.map(main_category => (
                <React.Fragment key={localString(main_category.title)}>
                    <ListItem>
                        <ListItemText
                            style={{ fontWeight: 600 }}
                            primary={
                                <Typography className={classes.title} variant="body1">
                                    {localString(main_category.title)}
                                </Typography>} />
                    </ListItem>
                    {main_category.categories.map(sub_category => (
                        <ListItem
                            onClick={() => onClick({ type: SettingEvents.onCheck, name: sub_category.name, cat_id: sub_category.cat_id })}
                            dense
                            button
                            key={sub_category.cat_id}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={Boolean(checked[sub_category.cat_id])}
                                    tabIndex={-1}
                                    disableRipple
                                    color="secondary"
                                />
                            </ListItemIcon>
                            <ListItemText primary={localString(sub_category.name)} />
                        </ListItem>
                    ))}
                    <Divider variant="middle" />
                </React.Fragment>
            ))
            }
        </List >
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'auto',
    },
    rootClose: {
        maxHeight: `calc(100vh - 220px)`
    },
    rootNoClose: {
        maxHeight: `calc(100vh - 170px)`
    },
    formLabel: {
        fontSize: '1.1rem',
        fontWeight: 600,
        textAlign: 'center',
        margin: `${theme.spacing(1)}px 0px`
    },
    formGroup: {
        justifyContent: 'space-around'
    },
    checkbox: {
        color: theme.palette.secondary.light
    },
    title: {
        fontWeight: 600,
    }
}))
export default Category