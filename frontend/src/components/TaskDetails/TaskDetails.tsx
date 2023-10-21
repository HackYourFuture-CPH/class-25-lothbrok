import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton } from '@mui/material/';
import { MoreHoriz, CloseRounded } from '@mui/icons-material/';
import TaskDetailsBody from '../TaskDetailsBody/TaskDetailsBody';
import { Task } from '../../types/Task';
import { useTaskStore, initialValue } from '../../store/task.store';
import './TaskDetails.css';
import api from '../../api';

type TaskDetailsType = {
  task: Task;
  getAllTasks: () => void;
  setTasks: (val: any) => void;
  allAssignees: { first_name: string; last_name: string; uid: string }[] | undefined;
};

const TaskDetails = ({ task, getAllTasks, setTasks, allAssignees }: TaskDetailsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setTask } = useTaskStore();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDetails = () => {
    setTask(initialValue);
  };

  const handleDelete = async () => {
    try {
      const req = await api();
      await req.delete(`/project/tasks/${task.id}`);
      setTasks((tasks: any) => {
        return tasks.filter((item: any) => item.id !== task.id);
      });
      setTask(initialValue);
    } catch (e) {
      console.error(e);
    }
    handleClose();
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
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
      </div>

      <TaskDetailsBody
        task={task}
        updateTasksInDom={getAllTasks}
        setTasks={setTasks}
        allAssignees={allAssignees}
      />
    </div>
  );
};

export default TaskDetails;
