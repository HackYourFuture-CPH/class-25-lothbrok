import { create } from 'zustand';
import { Task } from '../types/Task';

type TaskStoreType = {
  task: Task;
  setTask: (task: Task) => void;
};

type CompletedStoreType = {
  completed: boolean;
  setCompleted: (completed: boolean) => void;
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

export const useCompletedStore = create<CompletedStoreType>()((set) => ({
  completed: false,
  setCompleted: (completed: boolean) => set({ completed }),
}));

export default useTaskStore;
