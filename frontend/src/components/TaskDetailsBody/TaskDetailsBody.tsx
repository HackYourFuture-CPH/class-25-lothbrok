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
import { Task } from '../../types/Task';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

type TaskDetailsBodyType = {
  task: Task;
};

type DropdownType = {
  options: string[];
  selectedValue: string;
  fieldName: string;
};

const TaskDetailsBody = ({ task }: TaskDetailsBodyType) => {
  const { completed, setCompleted } = useCompletedStore();
  const { setTask } = useTaskStore();
  const completedStatus = completed[`${task.id}`] ?? false;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const defaultDueDate = task.due_date
    ? new Date(task.due_date).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : '—';
  const [dueDate, setDueDate] = useState(defaultDueDate);

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
        setTitle(event.target.value);
        break;
      case 'assignee':
        updatedTask.assignee = event.target.value;
        saveFieldToDatabase(task.id, 'assignee', updatedTask.assignee);
        break;
      case 'due_date':
        updatedTask.due_date = event.target.value;
        break;
      case 'priority':
        updatedTask.priority = event.target.value;
        saveFieldToDatabase(task.id, 'priority', updatedTask.priority);

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
  const saveDescriptionToDatabase = async (taskId: string | number, updatedDescription: string) => {
    try {
      const req = await api();
      const res = await req.put(`/dashboard/${taskId}`, {
        description: updatedDescription,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task.title, task.description]);

  const priorityArray = ['easy', 'medium', 'hard'];
  const usersArray = ['Arash', 'Mike']; // This array will be replaced by users data from database

  const Dropdown = ({ options, selectedValue, fieldName }: DropdownType) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant='standard' htmlFor='uncontrolled-native'></InputLabel>
          <NativeSelect value={selectedValue} onChange={(e) => handleInputChange(fieldName, e)}>
            {options.map((option: string, index: number) => {
              return (
                <option key={index} value={option}>
                  {option}
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
          <input
            style={{ border: 'none' }}
            value={title}
            onChange={(e) => handleInputChange('title', e)}
            onBlur={() => saveFieldToDatabase(task.id, 'title', title)}
          />
        </div>
      </div>
      <div className='task-owner'>
        <div className='details-topic'></div>
        <div className='details-status'>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Assignee</p>
              <AccountCircleRounded />
              <Dropdown options={usersArray} selectedValue={task.assignee} fieldName='assignee' />
            </div>
          </div>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Due date</p>
              <CalendarMonthRounded />

              <input
                type='datetime-local'
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
              <Dropdown
                options={priorityArray}
                selectedValue={task.priority}
                fieldName='priority'
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
        onBlur={() => saveDescriptionToDatabase(task.id, description)}
      ></textarea>
    </div>
  );
};

export default TaskDetailsBody;
