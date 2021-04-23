import node_lesson from "./node_lesson";

export default class Lesson {

    constructor(
        public id?:bigint,
        public module_id?:bigint,
        public name?: string,
        public content?: string,
        public test?: string,
        public status?: boolean,
        public percent?: boolean,
        public nodes?: Array<node_lesson>,
        public updated_at?:Date
    ){

    }

}