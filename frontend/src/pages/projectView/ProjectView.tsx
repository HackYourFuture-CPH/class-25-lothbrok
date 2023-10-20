import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import styles from './projectView.module.css';
import thumbnail from '../../assets/images/Rectangle 3025.svg';
import ProjectListView from '../../components/projectListView/ProjectListView';
import { useTaskStore, initialValue, useProjectStore } from '../../store/task.store';
import { TaskDetails } from '../../IndexForImport';
import ProjectKanbanView from '../../components/projectKanbanView/ProjectKanbanView';
import { Task } from '../../types/Task';
import { Project } from '../../types/Project';
import { Categories } from '../../types/Categories';
import { ViewProps } from '../../types/ViewProps';
import api from '../../api';
import { Task as TaskConstructor } from '../../classes/Task';
import { AddCircle } from '@mui/icons-material';
import AddUsersDialog from '../../components/addUsersDialog/AddUsersDialog';
import { Avatar, AvatarGroup, CircularProgress, Tooltip } from '@mui/material';

const ProjectView = () => {
  const { id: project_id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project>();
  const { storeTask } = useTaskStore();
  const [view, setView] = useState<string>('kanban');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [editing, setEditing] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [addUsers, setAddUsers] = useState<boolean>(false);
  const [projectMembers, setProjectMembers] = useState<string[]>();
  const [projectMemberUsernames, setProjectMemberUsernames] = useState<string[]>();
  const { setProjectTitle } = useProjectStore();
  const categories: Categories = {
    Documentation: 'documentation',
    Ongoing: 'ongoing',
    Todo: 'to_do',
    Done: 'done',
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };

  const checkIfUserHasAccess = async () => {
    try {
      const req = await api();
      const res = await req.get(`project/${project_id}/users`);
      const fetchedUsers: { project_id: number; user_uid: string }[] = await res.data;
      const users = fetchedUsers.map((user) => user.user_uid);
      setProjectMembers(users);
      users.includes(userId) ? setHasAccess(true) : setHasAccess(false);
      return users.includes(userId);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const getTasks = async () => {
    const userHasAccess = await checkIfUserHasAccess();
    try {
      if (userHasAccess) {
        const req = await api();
        const res = await req.get(`project/tasks/${project_id}`);
        const tasks = await res.data;
        setTasks(tasks);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getProject = async () => {
    try {
      const req = await api();
      const res = await req.get(`/project/${project_id}`);
      const project = await res.data;
      setProject(project);
      setProjectTitle(project.title);
    } catch (e) {
      console.error(e);
    }
  };

  const getProjectMemberNames = async () => {
    try {
      if (projectMembers) {
        const req = await api();
        const res = await req.post('/user/names', { uids: projectMembers });
        const data: { first_name: string; last_name: string }[] = res.data;
        const usernames = data.map((user) => `${user.first_name} ${user.last_name}`);
        setProjectMemberUsernames(usernames);
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
    getProject();
  }, [userId]);

  useEffect(() => {
    getProjectMemberNames();
  }, [projectMembers]);

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
        const res = await req.post(`/project/tasks`, task);
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
            await req.put(`/project/tasks/${task.id}`, { status: destination.droppableId });
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
    project && hasAccess ? (
      <div className={styles.project_view}>
        <div className={styles.project_box}>
          <div>
            <div className={styles.image_wrap}>
              <img className={styles.thumbnail} src={thumbnail} alt='project thumbnail' />
            </div>
            <div className={styles.title}>
              <span>Project / </span>
              <span className={styles.bold}>Details</span>
              <div className={styles.flex_row}>
                <h2 className={styles.project_title}>{project.title}</h2>
                <AvatarGroup max={4} className={styles.user_icons}>
                  {projectMemberUsernames
                    ? projectMemberUsernames.map((userName) => (
                        <Tooltip key={userName} title={userName}>
                          <Avatar
                            style={{
                              border: '3px solid #fff',
                              marginLeft: '-1rem',
                            }}
                          >
                            {getUserInitials(userName)}
                          </Avatar>
                        </Tooltip>
                      ))
                    : null}
                </AvatarGroup>
                <AddCircle
                  style={{ color: '#110D59', cursor: 'pointer', width: '2.5rem', height: '2.5rem' }}
                  onClick={() => setAddUsers(true)}
                />
                {addUsers ? (
                  <AddUsersDialog
                    projectMembers={projectMembers}
                    addUsers={addUsers}
                    setAddUsers={setAddUsers}
                    projectId={project_id}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.views}>
            <span
              onClick={() => changeView('kanban')}
              className={`${view === 'kanban' ? styles.bold : ''}`}
            >
              Kanban
            </span>{' '}
            <span
              onClick={() => changeView('list')}
              className={`${view === 'list' ? styles.bold : ''}`}
            >
              List
            </span>
          </div>
        </div>
        <div className={styles.project_views}>
          <div className={styles.list_wrapper}>
            {view === 'kanban' ? (
              <ProjectKanbanView {...viewProps} />
            ) : (
              <ProjectListView {...viewProps} />
            )}
          </div>
          {storeTask !== initialValue && <TaskDetails task={storeTask} getAllTasks={getTasks} />}
        </div>
      </div>
    ) : (
      <h3>Project Not Found</h3>
    )
  ) : (
    <CircularProgress />
  );
};

export default ProjectView;
