import { useState } from 'react'

import { GuestSignIn } from 'components/SignIn/GuestSignIn'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const SIGN_IN_STATES = Object.freeze({
    SELECT_METHOD: 0,
    COMPLETE: 1,
    VERIFY_EMAIL: 2,
    SSO_UNSUPPORTED: 3,
})

const signInOptions = [
    { 
        icon: faGoogle, 
        provider: 'Google', 
        nextStep: SIGN_IN_STATES.SSO_UNSUPPORTED
    },
    { 
        icon: faFacebook, 
        provider: 'Facebook', 
        nextStep: SIGN_IN_STATES.SSO_UNSUPPORTED
    },
    { 
        icon: faMicrosoft, 
        provider: 'Microsoft', 
        nextStep: SIGN_IN_STATES.SSO_UNSUPPORTED
    },
    { 
        icon: faQuestion, 
        provider: 'Guest', 
        nextStep: SIGN_IN_STATES.VERIFY_EMAIL
    },
]

export const SignIn = ({ handleClose, open }) => {
    const [signInStep, setSignInStep] = useState(SIGN_IN_STATES.SELECT_METHOD)

    const close = () => {
        setSignInStep(SIGN_IN_STATES.SELECT_METHOD)
        handleClose()
    }

    const signInComplete = () => {
        setSignInStep(SIGN_IN_STATES.COMPLETE)
        close()
    }
    
    return (
        <div>
            <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={open}>
                {
                    showSsoUnsupportedAlert(signInStep) ? 
                        <Alert variant="filled" severity="warning" onClose={() => {setSignInStep(SIGN_IN_STATES.SELECT_METHOD)}}>
                            SSO providers are currently unavailable. Please sign-in as Guest
                        </Alert>
                    : null
                }
                <DialogTitle id="simple-dialog-title">Sign In with</DialogTitle>
                <List>
                    {signInOptions.map(({ icon, provider, nextStep }) => (
                    <ListItem button onClick={() => setSignInStep(nextStep)} key={provider}>
                        <ListItemAvatar>
                        <Avatar>
                            <FontAwesomeIcon icon={icon} />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={provider} />
                    </ListItem>
                    ))}
                </List>
            </Dialog>

            <GuestSignIn open={open && openGuestSignIn(signInStep)} handleClose={() => setSignInStep(SIGN_IN_STATES.SELECT_METHOD)} handleComplete={signInComplete} />
        </div>
    )
}

const openGuestSignIn = (signInStep) => {
    return signInStep === SIGN_IN_STATES.VERIFY_EMAIL
}

const showSsoUnsupportedAlert = (signInStep) => {
    return signInStep === SIGN_IN_STATES.SSO_UNSUPPORTED
}
