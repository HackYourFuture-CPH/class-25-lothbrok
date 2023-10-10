import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import styles from './projectView.module.css';
import thumbnail from '../../assets/images/Rectangle 3025.svg';
import ProjectListView from '../../components/projectListView/ProjectListView';
import { useTaskStore, initialValue } from '../../store/task.store';
import { TaskDetails } from '../../IndexForImport';
import ProjectKanbanView from '../../components/projectKanbanView/ProjectKanbanView';
import { Task } from '../../types/Task';
import { Project } from '../../types/Project';
import { Categories } from '../../types/Categories';
import { ViewProps } from '../../types/ViewProps';
import api from '../../api';
import { Task as TaskConstructor } from '../../classes/Task';

const ProjectView = () => {
  const { id: project_id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
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

  const getTasks = async () => {
    try {
      if (userId) {
        const req = await api();
        const res = await req.get(`/dashboard/${project_id}/${userId}`);
        const tasks = await res.data;
        setTasks(tasks);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getProject = async () => {
    try {
      const req = await api();
      const res = await req.get(`/dashboard/project/${project_id}`);
      const project = await res.data;
      setProject(project);
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
    getProject();
    setIsLoading(false);
  }, [userId]);

  const changeView = (view: string) => {
    setView(view);
  };

  const addNewTask = async (status: string) => {
    if (project_id && title.trim()) {
      const task = new TaskConstructor();
      task.title = title;
      task.status = status;
      task.user_uid = userId;
      task.project_id = +project_id;
      try {
        const req = await api();
        const res = await req.post(`/dashboard`, task);
        const newTask = res.data[0];
        setTasks([...tasks, newTask]);
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
      <div className={styles.project_view}>
        <div className={styles.project_box}>
          <div>
            <div className={styles.image_wrap}>
              <img className={styles.thumbnail} src={thumbnail} alt='project thumbnail' />
            </div>
            <div>
              <span>Project / </span>
              <span className={styles.bold}>Details</span>
              <h2 className={styles.project_title}>{project.title}</h2>
            </div>
          </div>
          <div className={styles.views}>
            <span
              onClick={() => changeView('kanban')}
              className={`${styles.bold} ${view === 'kanban' ? styles.bold : ''}`}
            >
              Kanban
            </span>{' '}
            <span
              onClick={() => changeView('list')}
              className={`${styles.bold} ${view === 'list' ? styles.bold : ''}`}
            >
              List
            </span>
            <span
              onClick={() => changeView('calendar')}
              className={`${styles.bold} ${view === 'calendar' ? styles.bold : ''}`}
            >
              Calendar
            </span>
          </div>
        </div>
        <div className={styles.manrope_font}>
          <div>
            {view === 'kanban' ? (
              <ProjectKanbanView {...viewProps} />
            ) : view === 'list' ? (
              <ProjectListView {...viewProps} />
            ) : (
              <div>Calendar View</div>
            )}
          </div>
          {task !== initialValue && <TaskDetails task={task} />}
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
