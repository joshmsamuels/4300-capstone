import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './ManageNotifications.css'

import { EditNotification } from './EditNotification'

import GridList from '@material-ui/core/GridList'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

export const ManageNotifications = ({ notifications, updateNotification, updateOverrides, deleteNotification }) => {

    const [showEditDialog, setShowEditDialog] = useState(false)
    const [notificationToEdit, setNotificationToEdit] = useState(null)

    const shouldShowEditDialog = (notificationWithIndex)  => () => {
        setNotificationToEdit(notificationWithIndex)
        setShowEditDialog(true)
    }
    const shouldHideEditDialog = () => {
        setNotificationToEdit(null)
        setShowEditDialog(false)
    }

    // TODO: Fix this hacky code
    const [shouldUpdateToggle, setShouldUpdateToggle] = useState(false)
    const updateToggle = (index) => () => {
        let updateObj = {
            enableNotifs: !notifications[index].overrides.enableNotifs
        }

        // Updates overrides in App
        updateOverrides({
            index: index,
            newSettings: updateObj
        })

        // Hack to get the toggle to update when props change
        setShouldUpdateToggle(!shouldUpdateToggle)
    }

    return (
        <div>
            <GridList cellHeight={'auto'} cols={0} spacing={10}
                style={{margin: 20 }}
            >
                {
                    notifications.length === 0 ? 
                        <div>
                            No notifications to display
                        </div> :
                        notifications.map((notification, i) => (
                            <Grid item key={i}>
                                <Card variant="outlined">
                                    <CardHeader
                                        action={
                                            <div>
                                                <IconButton aria-label="Edit Notification" key={shouldUpdateToggle} onClick={shouldShowEditDialog({notification: notification, index: i})}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </IconButton>
                                                <IconButton aria-label="Delete Notification" onClick={deleteNotification(i)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </IconButton>
                        
                                                <Switch
                                                    checked={notifications[i].overrides.enableNotifs}
                                                    color="primary"
                                                    onChange={updateToggle(i)}
                                                    name="Notifications enabled"
                                                    title={
                                                        notifications[i].overrides.enableNotifs ? 
                                                            'Disable notifications' : 
                                                            'Enable notifications'
                                                    }
                                                />
                                            </div>
                                        }
                                        title={`${notification.courseData.code} - ${notification.courseData.name}`}
                                    />
                        
                                    <CardContent>
                                        <Typography variant="body2" component="p">
                                        course is available: {notification.notifications.courseAvailable ? 'on' : 'off'}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                        course is unavailable: {notification.notifications.courseUnavailable ? 'on' : 'off'}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                        Exam info Updates: {notification.notifications.examInfoUpdated ? 'on' : 'off'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        
                }
            </GridList>

            {
                showEditDialog && notificationToEdit !== null &&
                <EditNotification handleClose={shouldHideEditDialog} notification={notificationToEdit.notification} updateNotification={updateNotification(notificationToEdit.index)}/>
            }
        </div>
    )
}

ManageNotifications.propTypes = {
    notifications: PropTypes.array,
    updateNotification: PropTypes.func,
    updateOverrides: PropTypes.func,
    deleteNotification: PropTypes.func
}