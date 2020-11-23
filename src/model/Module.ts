import Lesson from "./Lesson";

export default class Module {

    constructor(
        public id?:bigint,
        public name?: string,
        public course_id?:bigint,
        public image?: string,
        public status?: boolean,
        public lessons?: Array<Lesson>,
        public updated_at?:Date
    ){}

}