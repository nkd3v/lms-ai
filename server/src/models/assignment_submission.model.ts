export interface AssignmentSubmission {
  user_ids: string[]; // Array of user IDs 
  assignment_id: string;
  created_at?: Date;
  submitted_at?: Date;
  data: string;
}
