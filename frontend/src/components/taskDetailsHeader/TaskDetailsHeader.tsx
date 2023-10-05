import React, { useState } from 'react';
import './TaskDetailsHeader.css';
import { Button, Menu, MenuItem, IconButton } from '@mui/material/';
import { MoreHoriz, CloseRounded } from '@mui/icons-material/';
import { useTaskStore, initialValue } from '../../store/task.store';

const TaskDetailsHeader: any = () => {
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
  );
};

export default TaskDetailsHeader;
