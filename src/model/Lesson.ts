export default class Lesson {

    constructor(
        public id?:bigint,
        public module_id?:bigint,
        public name?: string,
        public content?: string,
        public test?: string,
        public status?: boolean,
        public passed?: boolean,
        public updated_at?:Date
    ){}

}