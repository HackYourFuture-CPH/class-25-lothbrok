import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import './projectView.css';
import thumbnail from '../../assets/images/Rectangle 3025.svg';
import ProjectListView from '../../components/projectListView/ProjectListView';
import ProjectKanbanView from '../../components/projectKanbanView/ProjectKanbanView';
import { Task } from '../../types/Task';
import { Project } from '../../types/Project';
import { Categories } from '../../types/Categories';
import { ViewProps } from '../../types/ViewProps';
import api from '../../api';

const ProjectView = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project>({
    id: 1,
    title: 'Project A',
    description: 'Description for Project A',
    thumbnail_link: 'thumbnail_a.jpg',
    date_of_creation: '2023-09-20',
    amount_of_tasks: 5,
    user_uid: 1,
  });
  const [view, setView] = useState<string>('kanban');
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

  const getTasks = async () => {
    try {
      if (userId) {
        const req = await api();
        const res = await req.get(`/dashboard/${id}/${userId}`);
        const tasks = await res.data;
        setTasks(tasks);
      }
    } catch (e) {
      console.error(e);
    }
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
  }, []);

  useEffect(() => {
    getTasks();
    setIsLoading(false);
  }, [userId]);

  const changeView = (view: string) => {
    setView(view);
  };

  const addNewTask = async (status: string) => {
    if (id && title.trim()) {
      const task = {
        title,
        description: '',
        status,
        due_date: null,
        user_uid: userId,
        assignee: '',
        completed: false,
        priority: 'medium',
        project_id: +id,
      };
      setTasks([...tasks, { ...task, id: uuid() }]);
      try {
        const req = await api();
        await req.post(`/dashboard`, task);
      } catch (e) {
        console.error(e);
      }
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
      allTasks.map(async (task) => {
        if (String(task.id) === result.draggableId) {
          try {
            const req = await api();
            await req.put(`/dashboard/${task.id}`, { status: destination.droppableId });
          } catch (e) {
            console.error(e);
          }
        }
      });
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
          {view === 'kanban' ? (
            <ProjectKanbanView {...viewProps} />
          ) : view === 'list' ? (
            <ProjectListView {...viewProps} />
          ) : (
            <div>Calendar View</div>
          )}
        </div>
      </div>
    ) : (
      <h3>Project Not Found</h3>
    )
  ) : (
    <div>loading</div>
  );
};

export default ProjectView;
