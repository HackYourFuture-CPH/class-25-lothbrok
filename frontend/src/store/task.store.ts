import { create } from 'zustand';
import { Task } from '../pages/projectView/ProjectView';

type TaskStoreType = {
  task: Task;
  setTask: (task: Task) => void;
};

export const initialValue = {
  id: '',
  description: '',
  status: '',
  due_date: '',
  assignee: '',
  completed: false,
  priority: '',
  project_id: 0,
  user_id: '',
};
export const useTaskStore = create<TaskStoreType>()((set) => ({
  task: initialValue,
  setTask: (task: Task) => set({ task }),
}));

export default useTaskStore;
