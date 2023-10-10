import React from 'react';
import './TaskItem.css';
import Calendar from '../../assets/icons/Calendar.png';
import Assigned from '../../assets/icons/assigned task.png';
import Circle from '../../assets/icons/Danger Circle.png';
import { Project } from '../../types/Project';
import { useNavigate } from 'react-router-dom';

interface TaskItemProps {
  project: Project;
}

function TaskItem({ project }: TaskItemProps) {
  const { title, thumbnail_link, date_of_creation, amount_of_tasks } = project;
  const navigate = useNavigate();

  const completedPercentage = (Math.random() * 100).toFixed(2);

  return (
    <div className='task-item' onClick={() => navigate(`/project/${project.id}`)}>
      <div className='task-info'>
        <img src={thumbnail_link} className='thumbnail-image' />
        <div>
          <h3>{title}</h3>
          <div className='icon-container'>
            <p>
              <img src={Calendar} alt='Calendar' /> {date_of_creation}
            </p>
            <p>
              <img src={Assigned} alt='assigned-task' /> {amount_of_tasks}
            </p>
            <p>
              <img src={Circle} alt='Circle' /> {amount_of_tasks}
            </p>
          </div>
        </div>
      </div>
      <div className='progress-bar'>
        <div className='percentage-bar' style={{ width: `${completedPercentage}%` }}></div>
      </div>
      <p className='percentage-number'>{completedPercentage}%</p>
    </div>
  );
}

export default TaskItem;
