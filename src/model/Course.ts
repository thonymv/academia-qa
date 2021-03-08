import Module from "./Module";

export default class Course {

    constructor(
        public id?:bigint,
        public name?: string,
        public image?: string,
        public price?: number,
        public status?: boolean,
        public locked?: boolean,
        public description?: string,
        public description_english?: string,
        public modules?: Array<Module>,
        public updated_at?:Date
    ){}

}