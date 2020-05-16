import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { MainClickType } from "../../pages/main/MainConst";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText"
const HistoryPopper = ({ anchorEl, onClick }) => {
    const classes = useStyles();

    return (
        <Popper
            open={Boolean(anchorEl)}
            className={classes.popper}
            anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={() => onClick({ type: MainClickType.closeNoti })}>
                <Paper className={classes.paper} elevation={5}>
                    <List className={classes.list}>
                        <ListItem button>
                            <ListItemText primary="History Item" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="History Item" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="History Item" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="History Item" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="History Item" />
                        </ListItem>
                    </List>
                </Paper>
            </ClickAwayListener>

        </Popper>


    )
}

const useStyles = makeStyles(theme => ({
    popper: {
        position: 'fixed',
        zIndex: 2000,
        height: 200,
        width: 350,
    },
    arrow: {
        borderColor: 'transparent transparent white',
        borderWidth: '0 6px 10px',
        borderStyle: "solid",
        position: 'absolute',
        top: -10,
        right: 77,
    },
    list: {
        height: 200,
        overflow: 'auto'
    }
}))
export default HistoryPopper;