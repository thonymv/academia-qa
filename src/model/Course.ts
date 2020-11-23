import Module from "./Module";

export default class Course {

    constructor(
        public id?:bigint,
        public name?: string,
        public image?: string,
        public status?: boolean,
        public modules?: Array<Module>,
        public updated_at?:Date
    ){}

}