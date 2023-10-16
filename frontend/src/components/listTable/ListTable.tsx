import React, { useState, useEffect } from 'react';
import { Task } from '../../types/Task';
import styles from './listTable.module.css';
import { Checkbox, useMediaQuery } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Flag } from '@mui/icons-material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTaskStore, useCompletedStore } from '../../store/task.store';

type ListTableProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  listId: string;
};

const ListTable: React.FC<ListTableProps> = ({ tasks, setTasks, listId }: ListTableProps) => {
  const { setTask } = useTaskStore();
  const isMobile = useMediaQuery('(max-width: 550px)');
  const [enabled, setEnabled] = useState(false);

  const { setCompleted } = useCompletedStore();
  const handleCheckbox = (task: Task) => {
    setTasks((tasks) => {
      return tasks.map((item) =>
        item.id === task.id ? { ...item, completed: !item.completed } : item,
      );
    });
    setCompleted(String(task.id), !task.completed);
  };

  const handleOpenDetails = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string | number,
  ) => {
    e.stopPropagation();
    setTask(tasks.filter((task) => task.id === id)[0]);
  };

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
    <div className={styles.border_radius}>
      {!isMobile ? (
        <div className={styles.grid_container}>
          <div className={`${styles.grid_item} ${styles.first_row} ${styles.title}`}>Task</div>
          <div className={`${styles.grid_item} ${styles.first_row}`}>DueDate</div>
          <div className={`${styles.grid_item} ${styles.first_row}`}>Priority</div>
          <div className={`${styles.grid_item} ${styles.first_row}`}>Assigne</div>
        </div>
      ) : null}
      <Droppable droppableId={listId} isDropDisabled={false}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.droppable}>
            {tasks
              .filter((task) => task.status === listId)
              .map((task) => {
                const globalIndex = tasks.findIndex((item) => item.id === task.id);
                return (
                  <Draggable key={task.id} draggableId={String(task.id)} index={globalIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          onClick={(e) => handleOpenDetails(e, task.id)}
                          className={`${styles.grid_container} ${styles.task_row}`}
                          key={task.id}
                        >
                          <div
                            className={`${styles.grid_item} ${styles.title} ${
                              task.completed ? styles.completed_task : ''
                            }`}
                          >
                            <Checkbox
                              checked={task.completed}
                              icon={<RadioButtonUnchecked style={{ color: '#7D7A89' }} />}
                              checkedIcon={<CheckCircle style={{ color: '#5FB918' }} />}
                              onClick={() => handleCheckbox(task)}
                            />
                            {task.title}
                          </div>
                          <div className={styles.grid_item}>
                            {task.due_date
                              ? new Date(task.due_date).toLocaleString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                })
                              : '—'}
                          </div>
                          {!isMobile ? (
                            <div className={styles.grid_item}>
                              <Flag
                                style={{
                                  color:
                                    task.priority === 'easy'
                                      ? '#1AC391'
                                      : task.priority === 'hard'
                                      ? '#F14D4D'
                                      : '#F18524',
                                }}
                              />
                              {task.priority}
                            </div>
                          ) : null}

                          <div className={styles.grid_item}>{task.assignee}</div>
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

export default ListTable;
