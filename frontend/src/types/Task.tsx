export type Task = {
  id: number | string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  assignee: string;
  completed: boolean;
  priority: string;
  project_id: number | undefined;
  user_id: number | string;
};
