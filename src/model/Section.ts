import Course from './Course'
export default class Section {

    constructor(
        public id?: bigint,
        public name?: string,
        public description?: string,
        public status?: boolean,
        public courses?: Array<Course>,
        public updated_at?: Date,
        public create_at?: Date
    ) {
        
    }

}