export default class User {

    name: string
    email: string
    password: string
    email_verified_at: Date

    constructor(user:{ name:string,
        email:string,
        password:string,
        email_verified_at:Date
    }) {
        this.name = user.name?user.name:null
        this.email = user.email?user.email:null
        this.password = user.password?user.password:null
        this.email_verified_at = user.email_verified_at?user.email_verified_at:null
    }

}