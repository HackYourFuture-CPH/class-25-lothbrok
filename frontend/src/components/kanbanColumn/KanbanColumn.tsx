import { Task } from '../../types/Task';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { MoreHoriz, CalendarMonth } from '@mui/icons-material';
import './kanbanColumn.css';

type KanbanColumnProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  listId: string;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ tasks, listId }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }

  return (
    <div className='border-radius'>
      <Droppable droppableId={listId} isDropDisabled={false}>
        {(provided) => (
          <div className='droppable' {...provided.droppableProps} ref={provided.innerRef}>
            {tasks
              .filter((task) => task.status === listId)
              .map((task) => {
                const globalIndex = tasks.findIndex((item) => item.id === task.id);
                return (
                  <Draggable key={task.id} draggableId={String(task.id)} index={globalIndex}>
                    {(provided) => (
                      <div
                        className='kanban-task'
                        key={task.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className='kanban-task-row'>
                          <span className={`priority ${task.priority}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          <MoreHoriz
                            sx={{ color: '#7D7A89' }} /* on click open task detail component */
                          />
                        </div>
                        <h2 className='kanban-title'>{task.title}</h2>
                        <div className='description'>{task.description}</div>
                        <div className='kanban-task-row'>
                          <span>{task.assignee}</span>
                          <span className='date'>
                            {task.end ? (
                              <>
                                <CalendarMonth
                                  sx={{
                                    color: '#7D7A89',
                                    paddingRight: '0.25rem',
                                  }}
                                />
                                {new Date(task.end).toLocaleString('en-GB', {
                                  month: 'short',
                                })}
                              </>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
