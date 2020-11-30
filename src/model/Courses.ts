import Course from './Course'
import Storage from './Storage'
import {SERVER} from '../config/config'

export default class Courses {
    
    url: string
    constructor() {
        this.url = SERVER+"api/"
    }

    async find(id):Promise<Course>{
        var token = await Storage.getToken()
        const response = await fetch(this.url+'course/'+id, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
        return await response.json() as Course
    }

}