import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Strings from "../../libs/strings";
import { localString } from "../../libs/utils";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";


const LangDialog = ({ open, onClose }) => {
    const classes = useStyles();
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {localString(Strings.lang_title)}
            </DialogTitle>
            <DialogContent className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel>{localString(Strings.lang_language)}</InputLabel>
                    <Select>
                        {localString(Strings.lang_languages).map(language => (
                            <MenuItem key={language} value={language}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" disableElevation >
                    {localString(Strings.lang_cancel)}
                </Button>
                <Button variant="contained" disableElevation color="primary" >
                    {localString(Strings.lang_confirm)}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 250,
        margin: `0px auto ${theme.spacing(1)}px auto`
    },
    root: {
        display: 'flex',
    }
}))
export default LangDialog;