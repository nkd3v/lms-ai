export interface Assignment {
    id?: number; // Optional for new assignments
    topic: string;
    description: string;
    course_id: number;
    created_at?: Date;
  }
  