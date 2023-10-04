import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Flag } from '@mui/icons-material';
import task from '../../assets/images/Component 4.svg';
import swap from '../../assets/images/Swap.svg';
import filter from '../../assets/images/Filter.svg';
import './MyTask.css';

const MyTask = () => {
  const [boards] = useState([
    {
      id: 1,
      title: 'Assigned',
      tasks: [
        {
          id: 1,
          Task: 'Design feedback on wireframe',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 2,
          Task: 'Moodboarding',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 3,
          Task: 'Design feedback on wireframe',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 4,
          Task: 'UI Design feedback on wireframe',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 5,
          Task: 'Wallets',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 6,
          Task: 'Tab bar on card',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 7,
          Task: 'UI Iteration',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 8,
          Task: 'Activity/ Inbox advance filter',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 9,
          Task: 'Moodboarding',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
        {
          id: 10,
          Task: 'UI Iteration',
          DueDate: '7 Oct',
          Priority: 'Hard',
          Objective: '3 Objective',
          Status: 'Ongoing',
          Project: 'Bookum App',
        },
      ],
    },
  ]);

  return (
    <div className='task-item'>
      {boards.map((board) => (
        <div key={board.id}>
          <div className='title-container'>
            <div className='title-left'>
              <h3>{board.title}</h3>
            </div>
            <div className='title-right'>
              <img src={task} alt='task' className='task-icon' />
              <h3>All Task</h3> <img src={swap} alt='Close' className='Swap-icon' />
              <h3>Short</h3>
            </div>
          </div>
          <table>
            <thead>
              <tr className='table-header'>
                <th></th>
                <th>Task</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Objective</th>
                <th>Status</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              {board.tasks.map((task) => (
                <tr key={task.id} className='table-row'>
                  <td className='checkbox'>
                    <Checkbox
                      checked={task.completed}
                      icon={<RadioButtonUnchecked style={{ color: '#7D7A89' }} />}
                      checkedIcon={<CheckCircle style={{ color: '#5FB918' }} />}
                    />
                  </td>
                  <td>{task.Task}</td>
                  <td>{task.DueDate}</td>
                  <td>
                    <div className='grid-item'>
                      <Flag
                        style={{
                          color:
                            task.Priority === 'easy'
                              ? '#1AC391'
                              : task.Priority === 'hard'
                              ? '#F18524'
                              : '#F14D4D',
                        }}
                      />
                      {task.Priority}
                    </div>
                  </td>
                  <td>
                    <img src={filter} alt='Close' className='Filter-icon' />
                    {task.Objective}
                  </td>
                  <td>{task.Status}</td>
                  <td>{task.Project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

MyTask.propTypes = {
  id: PropTypes.number,
  dueDate: PropTypes.string,
  priority: PropTypes.string,
  objective: PropTypes.string,
  status: PropTypes.string,
  project: PropTypes.string,
  title: PropTypes.string,
  tasks: PropTypes.array,
};

export default MyTask;
