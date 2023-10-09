import { create } from 'zustand';
import { Task } from '../types/Task';

type TaskStoreType = {
  task: Task;
  setTask: (task: Task) => void;
};

type CompletedStoreType = {
  completed: Record<number | string, boolean>; // Task ID to completion status mapping
  setCompleted: (taskId: string, completed: boolean) => void;
};

export const initialValue: Task = {
  id: '',
  title: '',
  description: '',
  status: '',
  due_date: '',
  assignee: '',
  completed: false,
  priority: '',
  project_id: 0,
  user_uid: '',
};

export const useTaskStore = create<TaskStoreType>()((set) => ({
  task: initialValue,
  setTask: (task: Task) => set({ task }),
}));

export const useCompletedStore = create<CompletedStoreType>((set) => ({
  completed: {},
  setCompleted: (taskId: number | string, completed: boolean) => {
    set((state) => ({
      completed: {
        ...state.completed,
        [taskId]: completed,
      },
    }));
  },
}));

export default useTaskStore;
