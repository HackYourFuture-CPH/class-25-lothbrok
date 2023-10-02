import { Task } from '../../types/Task';
import React, { useState, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import { DragDropContext } from 'react-beautiful-dnd';
import './projectKanbanView.css';
import KanbanColumn from '../kanbanColumn/KanbanColumn';

const ProjectKanbanView = ({ tasks }: { tasks: Task[] }) => {
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);
  const [title, setTitle] = useState<string>('');
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
    if (id && title.trim()) {
      setAllTasks([
        ...allTasks,
        {
          id: uuid(), // for mocked data
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

  const editTitle = (status: string) => {
    setEditing(status);
    setTitle('');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='kanban'>
        {Object.entries(categories).map(([sectionTitle, status]) => (
          <div className='column' key={status}>
            <div className='section-title'>
              <h4>{sectionTitle}</h4>
              {editing === status ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addNewTask(status);
                    setEditing('');
                    setTitle('');
                  }}
                >
                  <TextField
                    placeholder='New Task Title'
                    variant='filled'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    inputProps={{
                      style: {
                        padding: 5,
                        background: 'white',
                      },
                    }}
                  />
                </form>
              ) : (
                <Add
                  sx={{ cursor: 'pointer', color: '#7D7A89' }}
                  onClick={() => editTitle(status)}
                />
              )}
            </div>
            <KanbanColumn listId={status} tasks={allTasks} setTasks={setAllTasks} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProjectKanbanView;
