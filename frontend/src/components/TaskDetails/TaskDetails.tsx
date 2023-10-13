import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton, Divider } from '@mui/material/';
import {
  MoreHoriz,
  CloseRounded,
  Add,
  CheckCircleRounded,
  RadioButtonUnchecked,
  AccountCircle,
  Circle,
} from '@mui/icons-material/';
import TaskDetailsBody from '../TaskDetailsBody/TaskDetailsBody';
import { Task } from '../../types/Task';
import { useTaskStore, initialValue } from '../../store/task.store';
import './TaskDetails.css';

type TaskDetailsType = {
  task: Task;
  tasks: Task[];
};

const TaskDetails = ({ task, tasks }: TaskDetailsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [attachments, setAttachments] = useState<string[]>([]);
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
  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments = Array.from(files).map((file) => URL.createObjectURL(file));
      setAttachments((prevAttachments) => [...prevAttachments, ...newAttachments]);
    }
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
            {/* Hidden file input */}
            <input
              type='file'
              accept='image/*'
              onChange={handleAttachment}
              style={{ display: 'none' }}
              id='attachment-input'
            />
            {/* IconButton to trigger file input */}
            <label htmlFor='attachment-input'>
              <IconButton component='span'>
                <Add />
              </IconButton>
            </label>
          </div>
          <div className='attachment-files'>
            {attachments.map((attachment, index) => (
              <img key={index} src={attachment} alt={`attachment-${index}`} />
            ))}
          </div>
        </div>
        <div className='single-detail'>
          <div className='single-header'>
            <p className='single-title'>Objective</p>
            <Add className='details-icon' />
          </div>
          <div className='task-objectives'>
            <div className='task-objective'>
              <CheckCircleRounded id='small-check' />
              <p>Project Kanban/Cards*Trello</p>
            </div>
            <Divider />
            <div className='task-objective'>
              <CheckCircleRounded id='small-check' />
              <p>Activity/Inbox*with advance filter</p>
            </div>
            <Divider />
            <div className='task-objective'>
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
