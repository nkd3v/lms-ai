export interface Course {
    id: string;
    join_code: string;
    name: string;
    created_at?: Date;
    icon_url: string;
    banner_url: string;
}

export interface CourseRelation {
    user_id: string;
    course_id: string;
    role: any;
}
