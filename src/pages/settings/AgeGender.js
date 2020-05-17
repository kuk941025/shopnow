import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from "@material-ui/core/Typography";
import Slider from "./SliderCss";
import Strings from "../../libs/strings";
import { localString } from "../../libs/utils";
import { SettingEvents } from "./SettingsConst";

const AgeGender = ({ gender, onClick, age }) => {
    const classes = useStyles();

    
    
    return (
        <div className={classes.root}>
            <Typography variant="body1" className={classes.title} gutterBottom>
                {localString(Strings.settings_gender)}
            </Typography>
            <ToggleButtonGroup
                exclusive
                value={gender}
                onChange={(e, value) => onClick({type: SettingEvents.onGender, data: value})}
            >   
                <ToggleButton value="male" className={classes.toggleButton}>
                    {localString(Strings.settings_male)}
                </ToggleButton>
                <ToggleButton value="female" className={classes.toggleButton}>
                    {localString(Strings.settings_female)}
                </ToggleButton>
            </ToggleButtonGroup>

            <div className={classes.ageRoot}>
                <Typography variant="body1" align="center" gutterBottom className={classes.title}>
                    {localString(Strings.settings_age)}
                </Typography>

                <Slider
                    onChange={(e, value) => onClick({type: SettingEvents.onAge, data: value})}
                    valueLabelDisplay="auto"
                    value={age}
                    step={10}
                    min={10}
                    max={60}
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