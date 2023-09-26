import { Task } from '../../pages/projectView/ProjectView';
import './listTable.css';
import React from 'react';
import { Checkbox, useMediaQuery } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Flag } from '@mui/icons-material';

type ListTableProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const ListTable: React.FC<ListTableProps> = ({ tasks, setTasks }) => {
  const isMobile = useMediaQuery('(max-width: 550px)');

  const handleCheckbox = (task: Task) => {
    setTasks((tasks) => {
      return tasks.map((item) =>
        item.id === task.id ? { ...item, completed: !item.completed } : item
      );
    });
  };

  return (
    <div className="border-radius">
      {!isMobile ? (
        <div className="grid-container">
          <div className="grid-item first-row title">Task</div>
          <div className="grid-item first-row">DueDate</div>
          <div className="grid-item first-row">Priority</div>
          <div className="grid-item first-row">Assigne</div>
        </div>
      ) : null}
      {tasks.map((task) => {
        return (
          <div className="grid-container task-row" key={task.id}>
            <div
              className={`grid-item title ${
                task.completed ? 'completed-task' : ''
              }`}>
              <Checkbox
                checked={task.completed}
                icon={<RadioButtonUnchecked style={{ color: '#7D7A89' }} />}
                checkedIcon={<CheckCircle style={{ color: '#5FB918' }} />}
                onClick={() => handleCheckbox(task)}
              />
              {task.description}
            </div>
            <div className="grid-item">
              {task.due_date
                ? new Date(task.due_date).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short'
                  })
                : '—'}
            </div>
            {!isMobile ? (
              <div className="grid-item">
                <Flag
                  style={{
                    color:
                      task.priority === 'easy'
                        ? '#1AC391'
                        : task.priority === 'hard'
                        ? '#F14D4D'
                        : '#F18524'
                  }}
                />
                {task.priority}
              </div>
            ) : null}

            <div className="grid-item">{task.assignee}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListTable;
