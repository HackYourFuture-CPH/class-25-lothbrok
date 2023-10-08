export type Project = {
  id: number;
  title: string;
  description?: string;
  thumbnail_link: string;
  date_of_creation: string;
  amount_of_tasks: number;
  user_id?: number;
};
