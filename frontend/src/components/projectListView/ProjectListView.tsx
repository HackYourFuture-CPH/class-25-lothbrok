import { Task } from '../../types/Task';
import React, { useState, useEffect } from 'react';
import ListTable from '../listTable/ListTable';
import { AddCircleOutline } from '@mui/icons-material';
import { TextField } from '@mui/material';
import './projectList.css';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import { DragDropContext } from 'react-beautiful-dnd';

const ProjectListView = ({ tasks }: { tasks: Task[] }) => {
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [description, setDescription] = useState<string>('');
  const [editing, setEditing] = useState<string>('');
  const categories = {
    Documentation: 'documentation',
    Ongoing: 'ongoing',
    Todo: 'to_do',
    Done: 'done',
  };

  const { id } = useParams();
  const [userId, setUserId] = useState<string>('');

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

  const addNewTask = (status: string) => {
    if (id && description.trim()) {
      setAllTasks([
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
          user_id: userId,
        },
      ]);
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const tasks = [...allTasks];
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      setAllTasks(
        tasks.map((task) =>
          String(task.id) === result.draggableId
            ? { ...task, status: destination.droppableId }
            : task,
        ),
      );
    } else {
      setAllTasks((allTasks) => {
        const tasks = [...allTasks];
        const [removed] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, removed);
        return tasks;
      });
    }
  };

  const editDescription = (status: string) => {
    setEditing(status);
    setDescription('');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.entries(categories).map(([title, status]) => (
        <React.Fragment key={status}>
          <div className='section-title'>
            <h4>{title}</h4>
            {editing === status ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addNewTask(status);
                  setEditing('');
                  setDescription('');
                }}
              >
                <TextField
                  placeholder='New Task Title'
                  variant='filled'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{
                    style: {
                      padding: 5,
                      background: 'white',
                    },
                  }}
                />
              </form>
            ) : (
              <AddCircleOutline
                sx={{ cursor: 'pointer' }}
                onClick={() => editDescription(status)}
              />
            )}
          </div>
          <ListTable listId={status} tasks={allTasks} setTasks={setAllTasks} />
        </React.Fragment>
      ))}
    </DragDropContext>
  );
};

export default ProjectListView;
