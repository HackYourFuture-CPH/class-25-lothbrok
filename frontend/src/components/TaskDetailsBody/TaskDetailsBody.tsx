import { useState, useEffect } from 'react';
import './TaskDetailsBody.css';
import { Checkbox } from '@mui/material';
import {
  AccountCircleRounded,
  CalendarMonthRounded,
  CheckCircle,
  RadioButtonUnchecked,
  Flag,
} from '@mui/icons-material/';
import api from '../../api';
import { useCompletedStore, useTaskStore, useProjectStore } from '../../store/task.store';
import { Task } from '../../types/Task';
import { format } from 'date-fns';
import { Dropdown } from '../dropdown/CustomDropDown';

type TaskDetailsBodyType = {
  task: Task;
  getAllTasks: () => void;
};

const TaskDetailsBody = ({ task, getAllTasks }: TaskDetailsBodyType) => {
  const { completed, setCompleted } = useCompletedStore();
  const { setTask } = useTaskStore();
  const completedStatus = completed[`${task.id}`] ?? false;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const defaultDueDate = task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd'T'HH:mm") : '';
  const [dueDate, setDueDate] = useState(defaultDueDate);
  const [projectUsers, setProjectUsers] = useState([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const { projectTitle } = useProjectStore();
  const priorityArray = ['easy', 'medium', 'hard'];
  const usersArray = ['Arash', 'Mike']; // This array will be replaced by users data from database

  const handleCheckbox = (task: Task) => {
    const updatedCompletedStatus = !completedStatus;
    setCompleted(`${task.id}`, updatedCompletedStatus);
    const updatedTask = { ...task, completed: updatedCompletedStatus };

    return updatedTask;
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  const updatedTask = { ...task };

  const handleInputChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    switch (fieldName) {
      case 'title':
        setTitle(event.target.value);
        break;
      case 'assignee':
        updatedTask.assignee = event.target.value;
        saveFieldToDatabase(task.id, 'assignee', updatedTask.assignee);
        break;
      case 'due_date':
        setDueDate(event.target.value);
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

  const saveToDatabase = async (taskId: string | number, fieldName: string, value: any) => {
    try {
      const req = await api();
      const data = { [fieldName]: value };
      await req.put(`/dashboard/${taskId}`, data);
      getAllTasks();
    } catch (error) {
      return error;
    }
  };

  const saveFieldToDatabase = async (
    taskId: string | number,
    fieldName: string,
    value: any,
  ): Promise<void> => {
    await saveToDatabase(taskId, fieldName, value);
  };

  const saveDescriptionToDatabase = async (
    taskId: string | number,
    updatedDescription: string,
  ): Promise<void> => {
    await saveToDatabase(taskId, 'description', updatedDescription);
  };

  const getProjectUsers = async (projectId: number) => {
    try {
      const req = await api();
      const res = await req.get(`/project/${projectId}/users`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDescription(task.description);
    setTitle(task.title);
    getAllTasks();
  }, [task.title, task.description]);

  useEffect(() => {
    // Update dueDate whenever a new task is selected
    const defaultDueDate = task.due_date
      ? format(new Date(task.due_date), "yyyy-MM-dd'T'HH:mm")
      : '';
    setDueDate(defaultDueDate);
  }, [task.due_date]);

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
          <p>{projectTitle}</p>
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
              <Dropdown
                options={usersArray}
                selectedValue={task.assignee}
                fieldName='assignee'
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Due date</p>
              <CalendarMonthRounded />

              <input
                type='datetime-local'
                style={{ border: 'none' }}
                value={dueDate}
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
                handleInputChange={handleInputChange}
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
