import User from './User'
import Storage from './Storage'
import {SERVER} from '../config/config'

export default class Users {

    url: string
    constructor() {
        this.url = SERVER+"api/"
    }

    async current(){
        var token = await Storage.getToken()
        const response = await fetch(this.url+'user/current', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
        return response.json()
    }

    async logged(){
        var token = await Storage.getToken()
        const response = await fetch(this.url+'logged', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
        return response.text()
    }

    async login(email: string, password: string){
        var data = {email,password}
        console.log(this.url);
        const response = await fetch(this.url+'login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }
}
    