import { useState } from 'react'
import './App.css'
import { Search } from 'components/Search'
import { NotificationRegistration } from 'components/NotificationRegistration'
import Course from 'models/Course'
import { SignIn } from 'components/SignIn'

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
  const [searchParam, setSearchParam] = useState({field: null, searchKey: ""})
  const [isSearching, setSearching] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        Welcome to Guelph Course Notifier
      </header>
      { isSearching ?
          <div>
            <span>
              Search by course code: <Search key='byCode' courses={courses.map(c => c.code)} updateSelection={(val) => setSearchParam({field: Course.GET_COURSE_CODE_KEY(), searchKey: val})} />
            </span>

            <span>
              Search by course name: <Search id='byName' courses={courses.map(c => c.name)} updateSelection={(val) => setSearchParam({field: Course.GET_NAME_KEY(), searchKey: val})} />
            </span>

            <button onClick={() => setSearching(false)}>Search</button>
          </div>
        : <div>
            <NotificationRegistration courses={courses.filter(course => course[searchParam.field] === searchParam.searchKey)} backToSearching={() => setSearching(true)} saveEmail={saveEmailToArray} />
          </div>
      }
      {
        showSignIn ? <SignIn hideSignIn={() => setShowSignIn(false)}/> : <button onClick={() => setShowSignIn(true)}>Sign In</button>
      }
    </div>
  );
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
