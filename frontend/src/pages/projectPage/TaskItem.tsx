import React from 'react';
import styles from './TaskItem.module.css';
import Calendar from '../../assets/icons/Calendar.png';
import Assigned from '../../assets/icons/assigned task.png';
import Circle from '../../assets/icons/Danger Circle.png';
import { Project } from '../../types/Project';

interface TaskItemProps {
  project: Project;
}

function TaskItem({ project }: TaskItemProps) {
  const { title, thumbnail_link, date_of_creation, amount_of_tasks } = project;

  const completedPercentage = (Math.random() * 100).toFixed(2);

  return (
    <div className={styles.task_item}>
      <div className={styles.task_info}>
        <img src={thumbnail_link} className={styles.thumbnail_image} />
        <div>
          <h3>{title}</h3>
          <div className={styles.icon_container}>
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
      <div className={styles.progress_bar}>
        <div className={styles.percentage_bar} style={{ width: `${completedPercentage}%` }}></div>
      </div>
      <p className={styles.percentage_number}>{completedPercentage}%</p>
    </div>
  );
}

export default TaskItem;
