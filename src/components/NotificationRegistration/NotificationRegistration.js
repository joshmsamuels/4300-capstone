import { useState } from 'react'
import Notification from 'models/Notification'

export const NotificationRegistration = ({courses, backToSearching, saveEmail}) => {
    const [email, setEmail] = useState("")

    const [courseAvailable, setCourseAvailable] = useState(false)
    const [courseUnavailable, setCourseUnavailable] = useState(false)
    const [examInfoUpdated, setExamInfoUpdated] = useState(false)
    return (
        <div>
            <p> NotificationRegistration </p>
            <p>course blob: {JSON.stringify(courses)}</p>

            <div>
                <label htmlFor="courseAvailable">Course Available</label>
                <input id="courseAvailable" type="checkbox" checked={courseAvailable} onChange={e => setCourseAvailable(e.target.checked)} />

                <label htmlFor="courseUnavailable">Course Unavailable</label>
                <input id="courseUnavailable" type="checkbox" checked={courseUnavailable} onChange={e => setCourseUnavailable(e.target.checked)} />

                <label htmlFor="examInfoUpdated">Updated Exam Info</label>
                <input id="examInfoUpdated" type="checkbox" checked={examInfoUpdated} onChange={e => setExamInfoUpdated(e.target.checked)} />        
            </div>    

            <div>
                <label htmlFor="email"> Email Address: </label>
                <input id="email" type="text" onChange={e => setEmail(e.target.value)}/>
                <button onClick={() => saveEmail({
                    email: email, 
                    courseData: courses, 
                    notifications: new Notification({
                        courseAvailable: courseAvailable,
                        courseUnavailable: courseUnavailable,
                        examInfoUpdated: examInfoUpdated
                    })
                })}> Sign up for notifications </button>
            </div>

            <button onClick={() => backToSearching()}>Back to searching</button>
        </div>
    )
 }