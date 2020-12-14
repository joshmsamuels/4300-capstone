import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './EditNotification.css'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

export const EditNotification = ({handleClose, notification, updateNotification}) => {
    const [notifications, setNotifications] = useState(notification.notifications)

    const onClose = () => {
        updateNotification(notifications)
        handleClose()
    }

    const handleNotificationsChange = (event) => {
        setNotifications({ ...notifications, [event.target.name]: event.target.checked })
    }

    return (
        <div>
            <Dialog 
                onClose={onClose}
                open={true}
                classes={{ paper: 'editNotificationDialog' }}
            >
                <FontAwesomeIcon icon={faTimesCircle} size="2x" className="closeGuestSignIn" onClick={onClose} />
                <DialogTitle id="simple-dialog-title">Notifications for {notification.courseData.code} - {notification.courseData.name}</DialogTitle>
                
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <FormGroup column="true">
                        {
                            Object.keys(notification.notifications).map((key, i) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={notifications[key]} 
                                            color="primary"
                                            onChange={handleNotificationsChange} 
                                            name={key}
                                        />
                                    }
                                    label={key}
                                    key={i}
                                />
                            ))
                        }
                    </FormGroup>
                </Grid>
            </Dialog>
        </div>
    )
}

EditNotification.propTypes = {
    handleClose: PropTypes.func,
    notification: PropTypes.object,
    updateNotification: PropTypes.func
}
