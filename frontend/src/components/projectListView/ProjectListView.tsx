import { Task } from '../../pages/projectView/ProjectView';
import { useState, useEffect } from 'react';
import ListTable from '../listTable/ListTable';
import { AddCircleOutline } from '@mui/icons-material';
import { TextField } from '@mui/material';
import './projectList.css';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ProjectListView = ({ tasks }: { tasks: Task[] }) => {
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);

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
      return allTasks.filter((task) => task.status === status);
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
  }, [allTasks]);

  const addNewTask = (
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    description: string,
    tasks: Task[],
    status: string
  ) => {
    if (id && description.trim()) {
      setTasks([
        ...tasks,
        {
          id: uuid(), // for mocked data
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

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      setAllTasks(
        allTasks.map((task) =>
          task.id === +result.draggableId
            ? { ...task, status: destination.droppableId }
            : task
        )
      );
    } else {
      const changeOrder = (
        setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
        tasksArr: Task[]
      ) => {
        setTasks((tasksArr) => {
          const tasks = [...tasksArr];
          const [removed] = tasks.splice(source.index, 1);
          tasks.splice(destination.index, 0, removed);
          return tasks;
        });
      };
      if (destination.droppableId === 'documentation') {
        changeOrder(setDocumentation, documentation);
      } else if (destination.droppableId === 'ongoing') {
        changeOrder(setOngoing, ongoing);
      } else if (destination.droppableId === 'to_do') {
        changeOrder(setTodo, todo);
      } else if (destination.droppableId === 'done') {
        changeOrder(setDone, done);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="section-title">
        <h4>Documentation</h4>
        {documentationEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
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
              placeholder="New Task Title"
              variant="filled"
              value={documentationDescription}
              onChange={(e) => setDocumentationDescription(e.target.value)}
              inputProps={{
                style: {
                  padding: 5,
                  background: 'white'
                }
              }}
            />
          </form>
        ) : (
          <AddCircleOutline
            sx={{ cursor: 'pointer' }}
            onClick={() => setDocumentationEditing(true)}
          />
        )}
      </div>
      <ListTable
        listId="documentation"
        tasks={documentation}
        setTasks={setAllTasks}
      />
      <div className="section-title">
        <h4>Ongoing</h4>
        {ongoingEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewTask(setOngoing, ongoingDescription, ongoing, 'ongoing');
              setOngoingEditing(false);
              setOngoingDescription('');
            }}>
            <TextField
              placeholder="New Task Title"
              variant="filled"
              value={ongoingDescription}
              onChange={(e) => setOngoingDescription(e.target.value)}
              inputProps={{
                style: {
                  padding: 5,
                  background: 'white'
                }
              }}
            />
          </form>
        ) : (
          <AddCircleOutline
            sx={{ cursor: 'pointer' }}
            onClick={() => setOngoingEditing(true)}
          />
        )}
      </div>
      <ListTable listId="ongoing" tasks={ongoing} setTasks={setAllTasks} />
      <div className="section-title">
        <h4>Pending</h4>
        {todoEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewTask(setTodo, todoDescription, todo, 'todo');
              setTodoEditing(false);
              setTodoDescription('');
            }}>
            <TextField
              placeholder="New Task Title"
              variant="filled"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
              inputProps={{
                style: {
                  padding: 5,
                  background: 'white'
                }
              }}
            />
          </form>
        ) : (
          <AddCircleOutline
            sx={{ cursor: 'pointer' }}
            onClick={() => setTodoEditing(true)}
          />
        )}
      </div>
      <ListTable listId="to_do" tasks={todo} setTasks={setAllTasks} />
      <div className="section-title">
        <h4>Done</h4>
        {doneEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewTask(setDone, doneDescription, done, 'done');
              setDoneEditing(false);
              setDoneDescription('');
            }}>
            <TextField
              placeholder="New Task Title"
              variant="filled"
              value={doneDescription}
              onChange={(e) => setDoneDescription(e.target.value)}
              inputProps={{
                style: {
                  padding: 5,
                  background: 'white'
                }
              }}
            />
          </form>
        ) : (
          <AddCircleOutline
            sx={{ cursor: 'pointer' }}
            onClick={() => setDoneEditing(true)}
          />
        )}
      </div>
      <ListTable listId="done" tasks={done} setTasks={setAllTasks} />
    </DragDropContext>
  );
};

export default ProjectListView;
