
export default class options_node_lesson {

    constructor(
        public id?:bigint,
        public node_lesson_id?:bigint,
        public position_init?:bigint,
        public position_succes?:bigint,
        public response?: string,
        public response_english?: string,
        public success?: boolean,
        public updated_at?:Date
    ){
        
    }

}