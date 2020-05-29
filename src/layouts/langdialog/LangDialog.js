import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Strings from "../../libs/strings";
import { localString, langCode } from "../../libs/utils";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { MainClickType } from "../../pages/main/MainConst";

const LangDialog = ({ open, handleClick }) => {
    const classes = useStyles();
    const [lang, setLang] = useState(langCode);


    const handleChange = e => {
        setLang(e.target.value);
    }

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={() => handleClick({ type: MainClickType.closeLang })}
        >
            <DialogTitle>
                {localString(Strings.lang_title)}
            </DialogTitle>
            <DialogContent className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel>{localString(Strings.lang_language)}</InputLabel>
                    <Select onChange={handleChange} value={lang}>
                        {localString(Strings.lang_languages).map((language, idx) => (
                            <MenuItem key={language} value={idx}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" disableElevation onClick={() => handleClick({ type: MainClickType.closeLang })}>
                    {localString(Strings.lang_cancel)}
                </Button>
                <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={() => handleClick({ type: MainClickType.updateLang, data: lang })}>
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