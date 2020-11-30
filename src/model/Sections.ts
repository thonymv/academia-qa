import Section from './Section'
import Storage from './Storage'
import {SERVER} from '../config/config'
export class Sections {

    url: string
    constructor() {
        this.url = SERVER+"api/"
    }

    async get(){
        var token = await Storage.getToken()
        const response = await fetch(this.url+'section', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
        return await response.json() as Array<Section>
    }

    async find(id){
        var token = await Storage.getToken()
        const response = await fetch(this.url+'section/'+id, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        })
        return await response.json() as Section
    }

}

export function getInstanceArraySection() {
    return new Array<Section>()
}