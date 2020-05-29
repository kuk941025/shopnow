import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grey from "@material-ui/core/colors/grey";
import { localString } from "../../libs/utils";
import Strings from "../../libs/strings";
import { withRouter } from "react-router-dom";
import URLs from "../../libs/urls";

const Search = ({ history }) => {
    const classes = useStyles();
    const [keyword, setKeyword] = useState('');

    const handleSubmit = e => {
        if (e) e.preventDefault();

        history.push(`${URLs.Search}?query=${keyword}`)        
    }
    return (
        <Paper elevation={0} className={classes.root}>
            <form type="submit" className={classes.form} onSubmit={handleSubmit}>
                <InputBase
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={classes.input}
                    placeholder={localString(Strings.search_placeholder)}
                />

                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </form>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0px 4px',
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
    form: {
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    }
}))
export default withRouter(Search);