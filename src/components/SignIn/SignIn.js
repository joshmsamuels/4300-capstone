import { useState } from 'react'

import { VerifyEmail } from 'components/SignIn/VerifyEmail'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

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
    VERIFY_EMAIL: 2
})

const signInOptions = [
    { 
        icon: faGoogle, 
        provider: 'Google', 
        nextStep: SIGN_IN_STATES.VERIFY_EMAIL
    },
    { 
        icon: faFacebook, 
        provider: 'Facebook', 
        nextStep: SIGN_IN_STATES.VERIFY_EMAIL
    },
    { 
        icon: faMicrosoft, 
        provider: 'Microsoft', 
        nextStep: SIGN_IN_STATES.VERIFY_EMAIL
    },
    { 
        icon: faQuestion, 
        provider: 'Guest', 
        nextStep: SIGN_IN_STATES.VERIFY_EMAIL
    },
]

export const SignIn = ({ onClose, open }) => {
    const [signInStep, setSignInStep] = useState(SIGN_IN_STATES.SELECT_METHOD)

    const signInComplete = () => {
        setSignInStep(SIGN_IN_STATES.COMPLETE)
        onClose()
    }
    
    return (
        <div>
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
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

            <VerifyEmail open={open && openVerifyEmailDialog(signInStep)} handleClose={() => setSignInStep(SIGN_IN_STATES.SELECT_METHOD)} handleComplete={signInComplete} />
        </div>
    )
}

const openVerifyEmailDialog = (signInStep) => {
    return signInStep === SIGN_IN_STATES.VERIFY_EMAIL
}
