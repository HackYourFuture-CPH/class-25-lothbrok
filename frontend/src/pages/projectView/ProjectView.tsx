import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import allTasks from './tasks';
import projects from './projects';
import thumbnail from '../../assets/images/Rectangle 3025.svg';
import './projectView.css';
import ProjectListView from '../../components/projectListView/ProjectListView';
import { ProjectDetails } from '../../IndexForImport';
import { useTaskStore, initialValue } from '../../store/task.store';

export type Task = {
  id: number | string;
  description: string;
  status: string;
  due_date: string;
  assignee: string;
  completed: boolean;
  priority: string;
  project_id: number | undefined;
  user_id: number | string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail_link: string;
  date_of_creation: string;
  amount_of_tasks: number;
  user_id: number;
};

const ProjectView = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project>();
  const [view, setView] = useState<string>('list');
  const { task } = useTaskStore();
  console.log(task);
  useEffect(() => {
    if (id) {
      setTasks(allTasks.filter((task) => task.project_id === +id));
      setProject(projects.filter((project) => project.id === +id)[0]);
    }
  }, []);

  return project ? (
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
        <div>
          <ProjectListView tasks={tasks} />
        </div>
        {task !== initialValue && <ProjectDetails task={task} />}
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default ProjectView;
