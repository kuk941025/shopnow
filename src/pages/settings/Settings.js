import React, { useState, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grey from "@material-ui/core/colors/grey";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button";
import AgeGender from "./AgeGender";
import Category from "./Category";
import Strings from "../../libs/strings";
import { localString } from "../../libs/utils";
import { SettingEvents } from "./SettingsConst";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "./SettingsActions";
import Loading from "../../layouts/loading/Loading";
import update from "immutability-helper";

const Settings = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [steps, setSteps] = useState(0);
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(20);
    const [checked, setChecked] = useState({});
    const { loading, categories } = useSelector(state => state.settings);

    useEffect(() => {
        dispatch(getCategories());
    }, []);


    const handleClick = action => {
        switch (action.type) {
            case SettingEvents.onGender:
                setGender(action.data);
                break;
            case SettingEvents.onAge:
                setAge(action.data);
                break;
            case SettingEvents.onCheck:
                setChecked(update(checked, {
                    [action.cat_id]: {$set: !Boolean(checked[action.cat_id])}
                }))
                console.log(action);
                break;
            default:
                break;
        }
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="sm" className={classes.container}>
                <Stepper activeStep={steps} className={classes.stepper}>
                    {localString(Strings.settings_steps).map(step => (
                        <Step key={step}>
                            <StepLabel >{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className={classes.contents}>
                    {steps === 0 && <AgeGender onClick={handleClick} gender={gender} />}
                    {steps === 1 && <Category  onClick={handleClick} main_categories={categories} checked={checked} />}
                </div>
                <div className={classes.buttonRoot}>
                    {steps === 0 &&
                        <Button
                            onClick={() => setSteps(steps + 1)}
                            fullWidth
                            color="primary"
                            variant="contained"
                            disabled={gender === "" ? true : false}
                            className={classes.button}
                            disableElevation>
                            {localString(Strings.settings_next)}
                        </Button>
                    }
                    {steps === 1 &&
                        <>
                            <Button
                                className={classes.button}
                                variant="contained"
                                disableElevation
                                onClick={() => setSteps(steps - 1)}
                            >
                                {localString(Strings.settings_prev)}
                            </Button>
                            <Button
                                className={classes.button}
                                variant="contained"
                                disableElevation
                                color="primary"
                                onClick={() => history.push("/recommends")}
                            >
                                {localString(Strings.settings_complete)}
                            </Button>
                        </>
                    }
                </div>
            </Container>

            <Loading loading={loading} />
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundColor: Grey['200'],
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    stepper: {
        margin: `0px ${theme.spacing(4)}px`
    },
    contents: {
        margin: `${theme.spacing(1)}px 0px`
    },
    buttonRoot: {
        marginTop: 'auto',
        display: 'flex'
    },
    button: {
        flex: 1,
        borderRadius: 3,
        height: 50,
    }
}))
export default Settings