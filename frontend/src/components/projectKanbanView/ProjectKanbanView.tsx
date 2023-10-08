import React from 'react';
import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import './projectKanbanView.css';
import KanbanColumn from '../kanbanColumn/KanbanColumn';
import { ViewProps } from '../../types/ViewProps';

const ProjectKanbanView = ({
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
}: ViewProps) => {
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
            <KanbanColumn listId={status} tasks={tasks} setTasks={setTasks} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProjectKanbanView;
