import { useState, useEffect } from 'react';
import './TaskDetailsBody.css';
import { Checkbox } from '@mui/material';
import {
  AccountCircleRounded,
  CalendarMonthRounded,
  CheckCircle,
  RadioButtonUnchecked,
  Flag,
  MoreHoriz,
} from '@mui/icons-material/';
import api from '../../api';
import { useCompletedStore, useTaskStore } from '../../store/task.store';
// import { Dropdown } from '../dropdown/CustomDropDown';
import { Task } from '../../types/Task';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
type TaskDetailsBodyType = {
  task: Task;
  tasks: Task[];
};

const TaskDetailsBody = ({ tasks }: TaskDetailsBodyType) => {
  const { completed, setCompleted } = useCompletedStore();
  const { setTask, task } = useTaskStore();
  const completedStatus = completed[`${task.id}`] ?? false;
  const [description, setDescription] = useState(task.description);
  const [assignee, setAssignee] = useState(task.assignee);
  const defaultDueDate = task.due_date
    ? new Date(task.due_date).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : '—';
  const [dueDate, setDueDate] = useState(defaultDueDate);
  const [priority, setPriority] = useState(task.priority);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleCheckbox = (task: Task) => {
    const updatedCompletedStatus = !completedStatus;

    setCompleted(`${task.id}`, updatedCompletedStatus);

    const updatedTask = { ...task, completed: updatedCompletedStatus };

    return updatedTask;
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleInputChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const updatedTask = { ...task };

    switch (fieldName) {
      case 'title':
        updatedTask.title = event.target.value;
        saveFieldToDatabase(task.id, 'title', updatedTask.title);
        break;
      case 'assignee':
        setAssignee(event.target.value);
        break;
      case 'due_date':
        updatedTask.due_date = event.target.value;
        break;
      case 'priority':
        updatedTask.priority = event.target.value;
        break;
      default:
        break;
    }
    setTask(updatedTask);
  };

  const saveFieldToDatabase = async (taskId: string | number, fieldName: string, value: any) => {
    try {
      const req = await api();
      const res = await req.put(`/dashboard/${taskId}`, {
        [fieldName]: value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const titles = tasks.map((item) => item.title);

  const Dropdown = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant='standard' htmlFor='uncontrolled-native'></InputLabel>
          <NativeSelect value={task.title} onChange={(e) => handleInputChange('title', e)}>
            {titles.map((title: string, index: number) => {
              return (
                <option key={index} value={title}>
                  {title}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Box>
    );
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
          <Dropdown />
        </div>
      </div>
      <div className='task-owner'>
        <div className='details-topic'></div>
        <div className='details-status'>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Assignee</p>
              <AccountCircleRounded />
              <input
                style={{ border: 'none' }}
                value={assignee}
                onChange={(e) => handleInputChange('assignee', e)}
                onBlur={() => saveFieldToDatabase(task.id, 'assignee', assignee)}
              />
            </div>
          </div>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Due date</p>
              <CalendarMonthRounded />

              <input
                type='text'
                style={{ border: 'none' }}
                value={defaultDueDate}
                onChange={(e) => handleInputChange('due_date', e)}
                onBlur={() => saveFieldToDatabase(task.id, 'due_date', dueDate)}
              />
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
              <input
                style={{ border: 'none' }}
                value={task.priority}
                onChange={(e) => handleInputChange('priority', e)}
                onBlur={() => saveFieldToDatabase(task.id, 'priority', task.priority)}
              />
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
