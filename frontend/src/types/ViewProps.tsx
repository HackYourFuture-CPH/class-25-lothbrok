import { Task } from './Task';
import { Categories } from './Categories';

export type ViewProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  editing: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  addNewTask: (status: string) => void;
  onDragEnd: (result: any) => void;
  editTitle: (status: string) => void;
  categories: Categories;
};
