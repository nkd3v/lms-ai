export interface User {
  id?: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture_url: string;
  created_at?: Date;
}