import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from "@material-ui/core/Typography";
import Slider from "./SliderCss";

const getMarks = () => {
    let marks = [];
    for (let i = 10; i <= 100; i += 5) {
        marks.push({ value: i, label: String(i) })
    }

    console.log(marks);
    return marks;
}
const AgeGender = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="body1" className={classes.title} gutterBottom>
                Gender
            </Typography>
            <ToggleButtonGroup
                exclusive
                value=""
            >
                <ToggleButton value="male" className={classes.toggleButton}>
                    Male
                </ToggleButton>
                <ToggleButton value="female" className={classes.toggleButton}>
                    Female
                </ToggleButton>
            </ToggleButtonGroup>

            <div className={classes.ageRoot}>
                <Typography variant="body1" align="center" gutterBottom className={classes.title}>
                    Age
                </Typography>

                <Slider
                    valueLabelDisplay="auto"
                    defaultValue={20}
                    step={5}
                    className={classes.slider}
                />
            </div>

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    toggleButton: {
        minWidth: 100,
    },
    slider: {
        color: theme.palette.primary.main,
    },
    ageRoot: {
        marginTop: theme.spacing(5),
        width: '80%',
        minWidth: 300, 
    },
    title: {
        fontWeight: '600',
        fontSize: '1.1rem'
    }
}))
export default AgeGender;