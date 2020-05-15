import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grey from "@material-ui/core/colors/grey";
import { localString } from "../../libs/utils";
import Strings from "../../libs/strings";
const Search = () => {
    const classes = useStyles();
    return (
        <Paper elevation={0} className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={localString(Strings.search_placeholder)}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 400,
        flex: 1, 
        backgroundColor: Grey['100']
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: theme.spacing(1),
        margin: 2
    },
}))
export default Search;