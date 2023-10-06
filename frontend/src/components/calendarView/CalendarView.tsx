import React from 'react';
import ListTable from '../listTable/ListTable';
import Calendar from '../calendar/Calendar';
import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { ViewProps } from '../../types/ViewProps';

const CalendarView = ({
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
      {Object.entries(categories).map(([sectionTitle, status]) => (
        <React.Fragment key={status}>
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
              <Add sx={{ cursor: 'pointer', color: '#7D7A89' }} onClick={() => editTitle(status)} />
            )}
          </div>
          <Calendar tasks={tasks} />
        </React.Fragment>
      ))}
    </DragDropContext>
  );
};

export default CalendarView;
