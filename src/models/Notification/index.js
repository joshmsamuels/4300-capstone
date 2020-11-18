export default class Notification {
    constructor({ 
        courseAvailable,
        courseUnavailable,
        examInfoUpdated
    }) {
        this.courseAvailable = courseAvailable
        this.courseUnavailable = courseUnavailable
        this.examInfoUpdated = examInfoUpdated
    }
}