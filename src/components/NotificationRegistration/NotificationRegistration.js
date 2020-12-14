import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Notification from 'models/Notification'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import SplitPane from 'react-split-pane'

import isEmail from 'validator/lib/isEmail'

export const NotificationRegistration = ({course, backToSearching, saveEmail}) => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [emailHelperText, setEmailHelperText] = useState('')

    const [notifications, setNotifications] = useState({
        checkedCourseAvailable: false, 
        checkedCourseunavailable: false, 
        checkedExamInfoUpdated: false
    })

    const handleNotificationsChange = (event) => {
        setNotifications({ ...notifications, [event.target.name]: event.target.checked })
    }

    const saveNotifications = () => {
        if (!isEmail(email)) {
            setEmailError(true)
            setEmailHelperText('Invalid Email Address')
            return
        }

        setEmailError(false)
        setEmailHelperText(`Notifications saved for ${email}`)
        saveEmail({
            email: email, 
            courseData: course, 
            overrides: { enableNotifs: true },
            notifications: new Notification({
                courseAvailable: notifications.checkedCourseAvailable,
                courseUnavailable: notifications.checkedCourseunavailable,
                examInfoUpdated: notifications.checkedExamInfoUpdated
            })
        })
    }
    
    return (
        <SplitPane split="vertical" defaultSize="50%">
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <FormGroup column="true">
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={notifications.checkedCourseAvailable} 
                                        color="primary"
                                        onChange={handleNotificationsChange} 
                                        name="checkedCourseAvailable" 
                                    />
                                }
                                label="Course Available"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={notifications.checkedCourseunavailable} 
                                        color="primary"
                                        onChange={handleNotificationsChange} 
                                        name="checkedCourseunavailable" 
                                    />
                                }
                                label="Course Unavailable"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={notifications.checkedExamInfoUpdated} 
                                        color="primary"
                                        onChange={handleNotificationsChange} 
                                        name="checkedExamInfoUpdated" 
                                    />
                                }
                                label="Updates to Exam Info"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item>
                        <TextField 
                            error={emailError}
                            helperText={emailHelperText}
                            id="email" 
                            label="Email Address"
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: 300}}
                            value={email}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={saveNotifications}
                        > 
                            Sign up for notifications 
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={backToSearching}
                        >
                            Back to searching
                        </Button>
                    </Grid>
                </Grid>
            </div>

            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <p> NotificationRegistration </p>
                    </Grid>
                    <Grid item>
                        <pre>course blob: {JSON.stringify(course, null, 2)}</pre>
                    </Grid>
                </Grid>
            </div>

        </SplitPane>
    )
}

NotificationRegistration.propTypes = {
    course: PropTypes.object,
    backToSearching: PropTypes.func,
    saveEmail: PropTypes.func
}
