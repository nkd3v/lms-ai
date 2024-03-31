export interface ProctorActivity {
    id: number;
    exam_id: number;
    user_id: number;
    type: string;
    description: string;
    image_url: string | null;
    created_at?: Date;
}
