import User from './User'

export default class Users {

    url: string
    token:string
    constructor() {
        this.url = "http://192.168.137.1:8000/api/"
        this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNGQ0NTFjMzJlYTRhM2M4M2E0OWIxNTFlNTliOWY1NDNhMzE5OTFiYWViYzA1YzlmMGU4M2Q4ZDFiYTc1NjgwYTQ0ODNkMTE0ODg3YjFiM2IiLCJpYXQiOjE2MDQ5ODczOTksIm5iZiI6MTYwNDk4NzM5OSwiZXhwIjoxNjM2NTIzMzk5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.FXir0AxnjY4YRdFAy7prUrNitCYf_GWF9Fk700BmB89z0a4nbi99YoNizB9VG_K6SqjzD4IuaBW5tt2Sdv3RrmGGfuSj9a-E6mw2KhNaf8CVZDWUYIbOYZVbBNJdrO00CgXGQnfj0jBVxhtawzXS-AGWLvXkVN2S90a-Td1LPzThL8zS0UMhoDJFR_zEGC5IdZ5bv69cenPVByN4JRrHDZW1DQCdjfZX9UJyDv5enJOPV_6kY2lxV5sFq5pwlh1HCSgtemOAlLgDl6if-QH1181MIiBik5iSH-maz_Xq0oUiyHrEzCXXL5f6u1xJQU8myGvBVbkdxaQ8-NNKO_yxxMfrPrv8kK9JtGK0qWuIFV9zHjtH9EiQkZGfXouq1w0Bbzr18MKdhfpiGZtdaXboel6dUCQ1qwRKR4EtTy-XSRKo02Pu3qMMTW2Qr2gUX5GQ6TGKvxlmbywvgrtorE7wFEc9haNA_T0LoTZsoL39AI7rl99xLg1rZUFzX1Sjvy6wYnJSHbavr2D-1u33HQTuXzma3EKhLrfXAx4pwhnl2d25wZ-LocjQTT4uqu3wHQ7AO6ZLYZmcc-H6sOk4wcG4iwpoSS-a2-QKXBjKiz0qE7dkUNs_7_twM7l82RDTCQtE2YROgu4D0X9KK8GTnHB8mVcuHGeMau1BDAJ4E6EJ_0g'
    }

    async all(){
        const response = await fetch(this.url+'user', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.token
            },
            body: ''
        })
        return response.json()
    }

    async login(email: string, password: string){
        var data = {email,password}
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
    