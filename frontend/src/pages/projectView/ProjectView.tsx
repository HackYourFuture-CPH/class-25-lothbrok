import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import allTasks from './tasks';
import projects from './projects';
import thumbnail from '../../assets/images/Rectangle 3025.svg';
import { v4 as uuid } from 'uuid';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import './projectView.css';
import ProjectListView from '../../components/projectListView/ProjectListView';
import { useTaskStore, initialValue } from '../../store/task.store';
import { TaskDetails } from '../../IndexForImport';
import ProjectKanbanView from '../../components/projectKanbanView/ProjectKanbanView';
import { Task } from '../../types/Task';
import { Project } from '../../types/Project';
import { Categories } from '../../types/Categories';
import { ViewProps } from '../../types/ViewProps';

const ProjectView = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [project, setProject] = useState<Project>();
  const [view, setView] = useState<string>('list');
  const { task } = useTaskStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [editing, setEditing] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const categories: Categories = {
    Documentation: 'documentation',
    Ongoing: 'ongoing',
    Todo: 'to_do',
    Done: 'done',
  };

  useEffect(() => {
    const setUser = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          setUserId(user.uid);
        }
      });
    };
    setUser();

    if (id) {
      setTasks(tasks.filter((task) => task.project_id === +id));
      setProject(projects.filter((project) => project.id === +id)[0]);
      setIsLoading(false);
    }
  }, []);

  const changeView = (view: string) => {
    setView(view);
  };

  const addNewTask = (status: string) => {
    if (id && title.trim()) {
      setTasks([
        ...tasks,
        {
          id: uuid(),
          title,
          description: '',
          status,
          due_date: '',
          assignee: '',
          completed: false,
          priority: '',
          project_id: +id,
          user_id: userId,
        },
      ]);
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const allTasks = [...tasks];
      const [removed] = allTasks.splice(source.index, 1);
      let newIndex = destination.index;
      if (destination.index > source.index) {
        newIndex--;
      }
      allTasks.splice(newIndex, 0, removed);
      setTasks(
        allTasks.map((task) =>
          String(task.id) === result.draggableId
            ? { ...task, status: destination.droppableId }
            : task,
        ),
      );
    } else {
      setTasks((tasks) => {
        const allTasks = [...tasks];
        const [removed] = allTasks.splice(source.index, 1);
        allTasks.splice(destination.index, 0, removed);
        return allTasks;
      });
    }
  };

  const editTitle = (status: string) => {
    setEditing(status);
    setTitle('');
  };

  const viewProps: ViewProps = {
    tasks,
    setTasks,
    title,
    setTitle,
    editing,
    setEditing,
    addNewTask,
    onDragEnd,
    editTitle,
    categories,
  };

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
            <span onClick={() => changeView('kanban')} className={view === 'kanban' ? 'bold' : ''}>
              Kanban
            </span>{' '}
            <span onClick={() => changeView('list')} className={view === 'list' ? 'bold' : ''}>
              List
            </span>
            <span
              onClick={() => changeView('calendar')}
              className={view === 'calendar' ? 'bold' : ''}
            >
              Calendar
            </span>
          </div>
        </div>
        <div className='manrope-font'>
          <div className='manrope-font'>
            {view === 'kanban' ? (
              <ProjectKanbanView {...viewProps} />
            ) : view === 'list' ? (
              <ProjectListView {...viewProps} />
            ) : (
              <div>Calendar View</div>
            )}
            {task !== initialValue && <TaskDetails task={task} />}
          </div>
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
