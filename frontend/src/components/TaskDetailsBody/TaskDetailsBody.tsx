import { useState } from 'react';
import './TaskDetailsBody.css';
import { Checkbox } from '@mui/material';
import {
  AccountCircleRounded,
  CalendarMonthRounded,
  CheckCircle,
  RadioButtonUnchecked,
  Flag,
} from '@mui/icons-material/';
import { useCompletedStore } from '../../store/task.store';

import { Task } from '../../types/Task';

type TaskDetailsBodyType = {
  task: Task;
};

const TaskDetailsBody = ({ task }: TaskDetailsBodyType) => {
  const { completed, setCompleted } = useCompletedStore();
  const completedStatus = completed[`${task.id}`] ?? false;
  const [description, setDescription] = useState(task.description);
  const handleCheckbox = (task: Task) => {
    const updatedCompletedStatus = !completedStatus;

    setCompleted(`${task.id}`, updatedCompletedStatus);

    const updatedTask = { ...task, completed: updatedCompletedStatus };

    return updatedTask;
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className='details-title'>
      <div className='task-name'>
        <Checkbox
          checked={completedStatus}
          icon={<RadioButtonUnchecked style={{ color: '#7D7A89' }} />}
          checkedIcon={<CheckCircle style={{ color: '#5FB918' }} />}
          onClick={() => handleCheckbox(task)}
        />
        <div className='label'>
          <p>Bookum App</p>
          <h6>{task.description}</h6>
        </div>
      </div>
      <div className='task-owner'>
        <div className='details-topic'></div>
        <div className='details-status'>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Assignee</p>
              <AccountCircleRounded />
              <p>{task.assignee}</p>{' '}
            </div>
          </div>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Due date</p>
              <CalendarMonthRounded />
              <p>{task.due_date}</p>
            </div>
          </div>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Priority</p>
              <Flag
                style={{
                  color:
                    task.priority === 'easy'
                      ? '#1AC391'
                      : task.priority === 'hard'
                      ? '#F14D4D'
                      : '#F18524',
                }}
              />
              <p>{task.priority}</p>
            </div>
          </div>
          <div className='status'>
            <div className='status-box'>
              <p>{task.status}</p>
            </div>
          </div>
        </div>
      </div>
      <textarea
        className='description'
        value={description}
        onChange={handleTextareaChange}
      ></textarea>
    </div>
  );
};

export default TaskDetailsBody;
