import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const tempData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const getFormControl = (classes) => {
    return (
        <>
            <FormControl>
                <FormLabel className={classes.formLabel}>Category 1</FormLabel>
                <FormGroup row className={classes.formGroup}>
                    {tempData.map((data, idx) => (
                        <FormControlLabel
                            key={data}
                            control={<Checkbox checked={false} name={String(data)} />}
                            label={<Typography className={classes.checkbox} noWrap>{"subasdasdasdqw"}</Typography>}
                            color="primary"
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <Divider variant="middle" />
        </>
    )
}
const Category = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {getFormControl(classes)}
            {getFormControl(classes)}
            {getFormControl(classes)}
            {getFormControl(classes)}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'auto',
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
        width: 50,
    }
}))
export default Category