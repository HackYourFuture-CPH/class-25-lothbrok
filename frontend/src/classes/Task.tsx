export class Task {
  title = '';
  description = '';
  status = '';
  due_date = null;
  user_uid = '';
  assignee = '';
  completed = false;
  priority = 'medium';
  project_id: number | undefined = undefined;
}
