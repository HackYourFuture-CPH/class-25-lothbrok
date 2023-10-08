import React from 'react';
import TaskItem from './TaskItem';
import { Project } from '../../types/Project';

interface TaskListProps {
  projects: Project[];
}

function TaskList({ projects }: TaskListProps) {
  return (
    <div className='task-list'>
      {projects.map((project) => (
        <TaskItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default TaskList;
