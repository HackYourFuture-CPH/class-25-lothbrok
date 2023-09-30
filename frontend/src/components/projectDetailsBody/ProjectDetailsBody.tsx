import React from 'react';
import './ProjectDetailsBody.css';
import {
  CheckCircleRounded,
  AccountCircleRounded,
  CalendarMonthRounded,
  FlagRounded,
} from '@mui/icons-material/';

import { Task } from '../../pages/projectView/ProjectView';

type ProjectDetailsBodyType = {
  task: Task;
};

const ProjectDetailsBody = ({ task }: ProjectDetailsBodyType) => {
  return (
    <div className='details-title'>
      <div className='project-name'>
        <CheckCircleRounded id='check-icon' />
        <div className='label'>
          <p>Bookum App</p>
          <h6>{task.description}</h6>
        </div>
      </div>
      <div className='project-owner'>
        <div className='details-topic'></div>
        <div className='details-status'>
          <div className='status'>
            <div className='icon-and-name'>
              <p>Assignee</p>
              {/* <img src="" alt="avatar" className="avatar"/> */}
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
              <FlagRounded />
              <p>{task.priority}</p>
            </div>
          </div>
          <div className='status'>
            <div className='status-box'>
              <p>Status</p>
              <p>{task.status}</p>
            </div>
          </div>
        </div>
      </div>
      <textarea className='description' defaultValue='...Description'></textarea>
    </div>
  );
};

export default ProjectDetailsBody;
