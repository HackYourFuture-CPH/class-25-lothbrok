import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import allTasks from './tasks';
import projects from './projects';
import thumbnail from '../../assets/images/Rectangle 3025.svg';
import './projectView.css';
import ProjectListView from '../../components/projectListView/ProjectListView';
import { Task } from '../../types/Task';
import { Project } from '../../types/Project';

const ProjectView = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project>();
  const [view, setView] = useState<string>('list');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setTasks(allTasks.filter((task) => task.project_id === +id));
      setProject(projects.filter((project) => project.id === +id)[0]);
      setIsLoading(false);
    }
  }, []);

  return !isLoading ? (
    project ? (
      <div className='project-view'>
        <div className='project-box'>
          <div>
            <div className='image-wrap'>
              <img className='thumbnail' src={thumbnail} alt='project thumbnail' />
            </div>
            <div>
              <span>Project / </span>
              <span className='bold'>Details</span>
              <h2>{project.title}</h2>
            </div>
          </div>
          <div className='views'>
            <span className={view === 'kanban' ? 'bold' : ''}>Kanban</span>{' '}
            <span className={view === 'list' ? 'bold' : ''}>List</span>
          </div>
        </div>
        <div className='manrope-font'>
          <ProjectListView tasks={tasks} />
        </div>
      </div>
    ) : (
      <h2>Project Not Found</h2>
    )
  ) : (
    <div>loading</div>
  );
};

export default ProjectView;
