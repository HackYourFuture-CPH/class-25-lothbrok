import { Task } from '../../pages/projectView/ProjectView';
import { useState, useEffect } from 'react';
import ListTable from '../listTable/ListTable';
import { AddCircleOutline } from '@mui/icons-material';
import { TextField } from '@mui/material';
import './projectList.css';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';

const ProjectListView = ({ tasks }: { tasks: Task[] }) => {
  const [documentation, setDocumentation] = useState<Task[]>([]);
  const [ongoing, setOngoing] = useState<Task[]>([]);
  const [todo, setTodo] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  const [documentationDescription, setDocumentationDescription] =
    useState<string>('');
  const [ongoingDescription, setOngoingDescription] = useState<string>('');
  const [todoDescription, setTodoDescription] = useState<string>('');
  const [doneDescription, setDoneDescription] = useState<string>('');

  const [documentationEditing, setDocumentationEditing] =
    useState<boolean>(false);
  const [ongoingEditing, setOngoingEditing] = useState<boolean>(false);
  const [todoEditing, setTodoEditing] = useState<boolean>(false);
  const [doneEditing, setDoneEditing] = useState<boolean>(false);

  const { id } = useParams();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const filterTaskByStatus = (status: string) => {
      return tasks.filter((task) => task.status === status);
    };
    const setUser = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          setUserId(user.uid);
        }
      });
    };
    setDocumentation(filterTaskByStatus('documentation'));
    setOngoing(filterTaskByStatus('ongoing'));
    setTodo(filterTaskByStatus('to_do'));
    setDone(filterTaskByStatus('done'));
    setUser();
  }, []);

  const addNewTask = (
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    description: string,
    tasks: Task[],
    status: string
  ) => {
    if (id) {
      setTasks([
        ...tasks,
        {
          id: uuid(),
          description,
          status,
          due_date: '',
          assignee: '',
          completed: false,
          priority: '',
          project_id: +id,
          user_id: userId
        }
      ]);
    }
  };

  return (
    <>
      <div className="section-title">
        <h4>Documentation</h4>
        {documentationEditing ? (
          <form
            onSubmit={() => {
              addNewTask(
                setDocumentation,
                documentationDescription,
                documentation,
                'documentation'
              );
              setDocumentationEditing(false);
              setDocumentationDescription('');
            }}>
            <TextField
              value={documentationDescription}
              onChange={(e) => setDocumentationDescription(e.target.value)}
            />
          </form>
        ) : (
          <AddCircleOutline onClick={() => setDocumentationEditing(true)} />
        )}
      </div>
      <ListTable tasks={documentation} setTasks={setDocumentation} />
      <div className="section-title">
        <h4>Ongoing</h4>
        {ongoingEditing ? (
          <form
            onSubmit={() => {
              addNewTask(setOngoing, ongoingDescription, ongoing, 'ongoing');
              setOngoingEditing(false);
              setOngoingDescription('');
            }}>
            <TextField
              value={ongoingDescription}
              onChange={(e) => setOngoingDescription(e.target.value)}
            />
          </form>
        ) : (
          <AddCircleOutline onClick={() => setOngoingEditing(true)} />
        )}
      </div>
      <ListTable tasks={ongoing} setTasks={setOngoing} />
      <div className="section-title">
        <h4>Pending</h4>
        {todoEditing ? (
          <form
            onSubmit={() => {
              addNewTask(setTodo, todoDescription, todo, 'todo');
              setTodoEditing(false);
              setTodoDescription('');
            }}>
            <TextField
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
            />
          </form>
        ) : (
          <AddCircleOutline onClick={() => setTodoEditing(true)} />
        )}
      </div>
      <ListTable tasks={todo} setTasks={setTodo} />
      <div className="section-title">
        <h4>Done</h4>
        {doneEditing ? (
          <form
            onSubmit={() => {
              addNewTask(setDone, doneDescription, done, 'done');
              setDoneEditing(false);
              setDoneDescription('');
            }}>
            <TextField
              value={doneDescription}
              onChange={(e) => setDoneDescription(e.target.value)}
            />
          </form>
        ) : (
          <AddCircleOutline onClick={() => setDoneEditing(true)} />
        )}
      </div>
      <ListTable tasks={done} setTasks={setDone} />
    </>
  );
};

export default ProjectListView;
