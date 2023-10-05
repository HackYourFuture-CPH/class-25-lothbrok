import './TaskDetails.css';
import TaskDetailsHeader from '../TaskDetailsHeader/TaskDetailsHeader';
import TaskDetailsBody from '../TaskDetailsBody/TaskDetailsBody';
import TaskDetailsRest from '../TaskDetailsRest/TaskDetailsRest';
import { Task } from '../../types/Task';

type TaskDetailsType = {
  task: Task;
};

const TaskDetails = ({ task }: TaskDetailsType) => {
  return (
    <div className='taskDetails'>
      <TaskDetailsHeader />
      <TaskDetailsBody task={task} />
      <TaskDetailsRest />
    </div>
  );
};

export default TaskDetails;
