export interface ExamSubmission {
    user_id: string;
    exam_id: string;
    started_at: Date;
    submitted_at?: Date; // Could be null before submission
    created_at?: Date;
  }
  