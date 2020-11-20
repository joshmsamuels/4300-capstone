export default class Course {
    constructor({
      available,
      capacity,
      code, 
      credits,
      level,
      location,
      meetingInfo,
      name, 
      professor,
      section,
      status,
      term,
    }) {
      this.available = available
      this.capacity = capacity
      this.code = code 
      this.credits = credits
      this.level = level
      this.location = location
      this.meetingInfo = meetingInfo
      this.name = name
      this.professor = professor
      this.section = section
      this.status = status
      this.term = term
    }
  
    static SEARCH_BY_NAME = () => "name"
    static SEARCH_BY_COURSE_CODE = () => "code"
  }  