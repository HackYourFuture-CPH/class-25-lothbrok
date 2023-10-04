import './TaskDetails.css';
import TaskDetailsHeader from '../taskDetailsHeader/TaskDetailsHeader';
import TaskDetailsBody from '../TaskDetailsBody/TaskDetailsBody';
import TaskDetailsRest from '../taskDetailsRest/TaskDetailsRest';
import { Task } from '../../types/Task';

type TaskDetailsType = {
  task: Task;
};

const TaskDetails = ({ task }: TaskDetailsType) => {
  return (
    <div className='TaskDetails'>
      <TaskDetailsHeader />
      <TaskDetailsBody task={task} />
      <TaskDetailsRest />
    </div>
  );
};

export default TaskDetails;
