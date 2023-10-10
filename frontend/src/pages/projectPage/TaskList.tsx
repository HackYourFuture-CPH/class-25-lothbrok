import React from 'react';
import TaskItem from './TaskItem';
import styles from './ProjectList.module.css';
import { Project } from '../../types/Project';

interface TaskListProps {
  projects: Project[];
}

function TaskList({ projects }: TaskListProps) {
  return (
    <div className={styles.task_list}>
      {projects.map((project) => (
        <TaskItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default TaskList;
