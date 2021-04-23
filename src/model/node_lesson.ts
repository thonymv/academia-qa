import option_node_lesson from "./options_node_lesson";

export default class node_lesson {

    constructor(
        public id?:bigint,
        public lesson_id?:bigint,
        public type_id?:number,
        public content?: string,
        public content_english?: string,
        public success?: boolean,
        public options?: Array<option_node_lesson>,
        public updated_at?:Date
    ){
        
    }

}