import React from 'react';
import './ProjectDetailsBody.css';
import { Checkbox } from '@mui/material';
import {
  CheckCircleRounded,
  AccountCircleRounded,
  CalendarMonthRounded,
  FlagRounded,
  CheckCircle,
  RadioButtonUnchecked,
  Flag,
} from '@mui/icons-material/';

import { Task } from '../../pages/projectView/ProjectView';

type ProjectDetailsBodyType = {
  task: Task;
};

const ProjectDetailsBody = ({ task }: ProjectDetailsBodyType) => {
  return (
    <div className='details-title'>
      <div className='project-name'>
        <Checkbox
          readOnly
          checked={task.completed}
          icon={<RadioButtonUnchecked style={{ color: '#7D7A89' }} />}
          checkedIcon={<CheckCircle style={{ color: '#5FB918' }} />}
        />
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
      <textarea className='description' defaultValue='...Description'></textarea>
    </div>
  );
};

export default ProjectDetailsBody;
