import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton } from '@mui/material/';
import {
  MoreHoriz,
  CloseRounded,
  Add,
  CheckCircleRounded,
  RadioButtonUnchecked,
  AccountCircle,
  Circle,
} from '@mui/icons-material/';
import { Divider } from '@mui/material';
import TaskDetailsBody from '../TaskDetailsBody/TaskDetailsBody';
import { Task } from '../../types/Task';
import { useTaskStore, initialValue } from '../../store/task.store';
import './TaskDetails.css';

type TaskDetailsType = {
  task: Task;
};

const TaskDetails = ({ task }: TaskDetailsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { setTask } = useTaskStore();

  const handleCloseDetails = () => {
    setTask(initialValue);
  };
  return (
    <div className='taskDetails'>
      <div className='task-details-header'>
        <IconButton aria-label='close' onClick={handleCloseDetails}>
          <CloseRounded />
        </IconButton>
        <div>
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHoriz />
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>option 1</MenuItem>
            <MenuItem onClick={handleClose}>option 2</MenuItem>
            <MenuItem onClick={handleClose}>option 3</MenuItem>
          </Menu>
        </div>
      </div>

      <TaskDetailsBody task={task} />

      <div className='other-details'>
        <div className='single-detail'>
          <div className='single-header'>
            <p className='single-title'>Attachment</p>
            <Add className='details-icon' />
          </div>
          <div className='attachment-files'>
            <img
              src='https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
              alt='attachment'
            />
            <img
              src='https://images.unsplash.com/photo-1612442058361-178007e5e498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
              alt='attachment'
            />
          </div>
        </div>
        <div className='single-detail'>
          <div className='single-header'>
            <p className='single-title'>Objective</p>
            <Add className='details-icon' />
          </div>
          <div className='objects'>
            <div className='object'>
              <CheckCircleRounded id='small-check' />
              <p>Project Kanban/Cards*Trello</p>
            </div>
            <Divider />
            <div className='object'>
              <CheckCircleRounded id='small-check' />
              <p>Activity/Inbox*with advance filter</p>
            </div>
            <Divider />
            <div className='object'>
              <RadioButtonUnchecked id='small-circle' />
              <p>Project List *Asana</p>
            </div>
            <Divider />
          </div>
          <textarea className='question' defaultValue='Ask question or post an update' />
        </div>
        <div className='single-detail'>
          <p className='single-title'>Comments(1)</p>
          <div className='comment'>
            <div className='comment-section'>
              <AccountCircle />
              <p>Jackson Pierce</p>
            </div>
            <p className='comment-text'>
              It is a long and a reader will be distracted by the readable content of a page when
              looking at its layout. The point of
            </p>
          </div>
          <div className='comment'>
            <div className='comment-section comment-part'>
              <Circle />
              <p>Superboard</p>
            </div>
            <p className='comment-text'>
              The leap into electronic typesetting, remaining essentially unchanged
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
