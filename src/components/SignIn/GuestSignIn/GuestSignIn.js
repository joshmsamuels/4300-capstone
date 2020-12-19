
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './GuestSignIn.css'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'

import isEmail from 'validator/lib/isEmail'

export const GuestSignIn = ({ handleClose, handleComplete, open }) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose} classes={{ paper: 'guestSignInDialog' }} aria-labelledby="form-dialog-title">
                <FontAwesomeIcon icon={faTimesCircle} size="2x" className="closeGuestSignIn" onClick={handleClose} />
                <VerifyEmail handleComplete={handleComplete} />
            </Dialog>
        </div>
    )
}

GuestSignIn.propTypes = {
    handleClose: PropTypes.func,
    handleComplete: PropTypes.func,
    open: PropTypes.bool
}

export const VerifyEmail = ({ handleComplete }) => {
    const steps = [
        {
            label: 'enter email',
            prompt: 'Please enter your email address',
            textFieldLabel: 'Email Address',
            validate: (email) => {
                return isEmail(email)
            },
            errorMessage: 'Invalid email address' 
        }, {
            label: 'verify email',
            prompt: 'Please enter the verification code in your inbox',
            textFieldLabel: 'Verification Code',
            validate: (code) => {
                return code.length > 0
            },
            errorMessage: 'Incorrect Verification Code'
        }
    ]

    const [activeStep, setActiveStep] = useState(0)
    const [textboxValue, setTextboxValue] = useState('')
    const [textboxError, setTextboxError] = useState(false)
    const [savedFields, setSavedFields] = useState([])

    const updateSavedFields = () => {
        let current = savedFields
        current[activeStep] = textboxValue
        setSavedFields(current)
    }

    // TODO: Add X to Sign In and connect to handleClose
    
    const handleNext = () => {
        if (!steps[activeStep].validate(textboxValue)) {
            setTextboxError(true)
            return
        }

        updateSavedFields()
        setTextboxError(false)
        setTextboxValue('')

        if (activeStep + 1 === steps.length) {
            handleComplete(savedFields[0])
        }    
  
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  
    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((step) => {
                    const stepProps = {}
                    const labelProps = {}
                    return (
                        <Step key={step.label} {...stepProps}>
                            <StepLabel {...labelProps}> {step.label} </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <div>
                <div>
                    <Typography> {steps[activeStep].prompt} </Typography>
                    <TextField
                        autoFocus
                        error={textboxError}
                        fullWidth
                        helperText={textboxError ? steps[activeStep].errorMessage : ''}
                        id={steps[activeStep].label}
                        label={steps[activeStep].textFieldLabel}
                        onChange={e => setTextboxValue(e.target.value)}
                        value={textboxValue}
                        variant="outlined"
                    />
                    <div>
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                        </Button>
  
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                            {activeStep === steps.length - 1 ? 'Sign In' : 'Send Code'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

VerifyEmail.propTypes = {
    handleComplete: PropTypes.func
}
