import { useState } from 'react'
import './App.css'

import Course from 'models/Course'

import {
  NotificationRegistration,
  SignIn
} from 'components'

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const courses = [
  new Course({
    available: 0,
    capacity: 15,
    code: "CIS*1050",
    credits: 0.5,
    level: "Undergraduate",
    location: "Guelph",
    meetingInfo: "Distance Education Days TBA\nTimes TBA\nRoom TBA",
    name: "Web Design & Development",
    professor: "M. Wirth",
    status: "Closed",
    term: "Winter 2021"
  }),
  new Course({
    available: 64,
    capacity: 100,
    code: "CIS*1200",
    credits: 0.5,
    level: "Undergraduate",
    location: "Guelph",
    meetingInfo: "Distance Education Days TBA\nTimes TBA\nRoom TBA",
    name: "Introduction to Computing",
    professor: "TBA TBA",
    status: "Open",
    term: "Winter 2021"
  })
]

let notificationArr = []

function App() {
  const [course, setCourse] = useState(null)
  const [isSearching, setSearching] = useState(true)
  const [shouldShowSignInDialog, setShowSignInDialog] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const showSignInDialog = () => {
    setShowSignInDialog(true)
  }
  const hideSignInDialog = () => {
    setShowSignInDialog(false)
  }

  const searchButtonDisabled = () => {
    return !course
  }

  const showSearching = () => {
    setCourse(null)
    setSearching(true)
  }

  const isUserSignedIn = () => {
    return userEmail.length > 0
  }
  const signOut = () => {
    setUserEmail("")
  }

  return (
    // <div className="content">
    <Grid 
      container
      direction="column"
      spacing={3}
    >
      <Grid item>
        <AppBar position="static">
          <Toolbar className="header">
            <Typography variant="h6">
              Guelph Course Notifier
            </Typography>

            <div>
              { isUserSignedIn() && 
                <Button color="inherit"> Manage Notifications</Button>
              }
              { isUserSignedIn() ? 
                <Button color="inherit" onClick={signOut}> Sign Out </Button> :
                <Button color="inherit" onClick={showSignInDialog}> Sign In </Button>
              }
            </div>
          </Toolbar>
        </AppBar>
      </Grid>

      <Grid item>
        { isSearching &&
          <Grid
            container
            classes={{ root: 'mainContent' }}
            direction="column"
            spacing={2}
            style={{
              // TODO: Move to App.css - not sure why it wasnt working
              width: 300,
              margin: "auto",
            }}
          >
            <Grid item>
              <Autocomplete
                  getOptionLabel={(option) => option.code}
                  id="searchByCode"
                  onChange={(e, selectedCourse) => setCourse(selectedCourse)} 
                  options={courses}
                  renderInput={(params) => <TextField {...params} label="Course Code" variant="outlined" />}
              />
            </Grid>

            <Grid item>
              <Autocomplete
                  id="searchByName"
                  options={courses}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Course Name" variant="outlined" />}
                  onChange={(e, selectedCourse) => setCourse(selectedCourse)}
              />
            </Grid>

            <Grid item>
              <Button 
                color="primary" 
                disabled={searchButtonDisabled()}
                fullWidth 
                onClick={() => setSearching(false)}
                variant="outlined" 
              >
                Search
              </Button>
            </Grid>
          </Grid>
        } 
          
        { !isSearching &&
            <NotificationRegistration course={course} backToSearching={showSearching} saveEmail={saveEmailToArray} />
        }

        { shouldShowSignInDialog && 
          <SignIn handleClose={hideSignInDialog} setEmail={setUserEmail}/>
        }
      </Grid>
    {/* </div> */}
    </Grid>
  )
}

const saveEmailToArray = ({ email, courseData, notifications }) => {
  if (!notificationArr[email]) {
    notificationArr[email] = []
  }

  notificationArr[email].push({
    courseData: courseData,
    notifications: notifications,
  })
}

export default App;
