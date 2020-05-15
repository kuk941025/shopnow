import React, { useState } from 'react'
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


const Settings = ({ history }) => {
    const classes = useStyles();
    const [steps, setSteps] = useState(0);
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
                    {steps === 0 && <AgeGender />}
                    {steps === 1 && <Category />}
                </div>
                <div className={classes.buttonRoot}>
                    {steps === 0 &&
                        <Button
                            onClick={() => setSteps(steps + 1)}
                            fullWidth
                            color="primary"
                            variant="contained"
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
                                onClick={() => history.push("/main")}
                            >
                                {localString(Strings.settings_complete)}
                            </Button>
                        </>
                    }
                </div>
            </Container>
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
        borderRadius: 0,
    }
}))
export default Settings