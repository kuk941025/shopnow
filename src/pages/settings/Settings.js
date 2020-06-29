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
import { getCategories, setUserData } from "./SettingsActions";
import Loading from "../../layouts/loading/Loading";
import update from "immutability-helper";
import URLs from "../../libs/urls";
import ErrorPage from "../error_page/ErrorPage";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { showMessage } from "../../layouts/snackbar/SnackAction";

const Settings = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [steps, setSteps] = useState(0);
    const [gender, setGender] = useState('both');
    const [age, setAge] = useState(20);
    const [checked, setChecked] = useState({});
    const [showClose, setShowClose] = useState(true);
    const { loading, categories, user_data, err, precached } = useSelector(state => state.settings);

    useEffect(() => {
        //if not precached, getCategories is called in store.js when receives a message from the service worker
        
        dispatch(getCategories());
        
    }, [dispatch, precached])

    //Init user data if exists
    useEffect(() => {
        if (!user_data) {
            setShowClose(false);
            return;
        };

        setGender(user_data.gender);
        setAge(user_data.age);

        let selected_categories = {};
        user_data.selected_categories.forEach(category => {
            selected_categories[category.cat_id] = category;
        });
        setChecked(selected_categories);
    }, [user_data])


    const handleClick = action => {
        switch (action.type) {
            case SettingEvents.onGender:
                if (!action.data) setGender("")
                else setGender(action.data);
                break;
            case SettingEvents.onAge:
                setAge(action.data);
                break;
            case SettingEvents.onCheck:
                setChecked(update(checked, {
                    [action.cat_id]: { $set: Boolean(checked[action.cat_id]) ? null : { name: action.name, cat_id: action.cat_id } }
                }))
                break;
            case SettingEvents.complete:
                let cnt = 0;
                Object.keys(checked).forEach(key => {
                    if (checked[key]) cnt++;
                })

                if (cnt < 5) {
                    dispatch(showMessage(localString(Strings.settings_category_error)));
                    return;
                }

                //if >= 5 categories are selected
                let selected_categories = [];
                Object.keys(checked).forEach(key => {
                    if (checked[key]) selected_categories.push(checked[key]);
                })
                localStorage.setItem("userdata", JSON.stringify({ gender, age, selected_categories }));
                dispatch(setUserData({ gender, age, selected_categories }))
                history.push(URLs.Main);
                break;
            default:
                break;
        }
    }

    if (err.value) {
        return (
            <ErrorPage
                msg={localString(Strings.err_msg_offline)}
                btn={{ msg: localString(Strings.err_retry), onClick: () => dispatch(getCategories()) }}
            />
        )
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="sm" className={classes.container}>
                {showClose &&
                    <div className={classes.iconRoot}>
                        <IconButton onClick={() => history.push(URLs.Main)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                }
                <Stepper activeStep={steps} className={classes.stepper}>
                    {localString(Strings.settings_steps).map(step => (
                        <Step key={step}>
                            <StepLabel >{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className={classes.contents}>
                    {steps === 0 && <AgeGender onClick={handleClick} gender={gender} age={age} />}
                    {steps === 1 &&
                        <Category
                            showClose={showClose}
                            onClick={handleClick}
                            main_categories={categories}
                            checked={checked} />}
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
                                onClick={() => handleClick({ type: SettingEvents.complete })}
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
    },
    iconRoot: {
        display: 'flex',
        marginLeft: 'auto',
        "& svg": {
            color: theme.palette.secondary.main
        }
    }
}))
export default Settings