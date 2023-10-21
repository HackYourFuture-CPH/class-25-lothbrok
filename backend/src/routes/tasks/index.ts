import express, { Router } from 'express';
import {
  getAllTasksOfProject,
  getTasksForProjectAndUser,
  addNewTask,
  updateTask,
  assignTaskToUser,
  deleteTask,
} from '../../controllers/tasks';

const tasks: Router = express.Router();

tasks.get('/:project_id/', getAllTasksOfProject);
tasks.get('/:project_id/:user_id', getTasksForProjectAndUser);
tasks.post('/', addNewTask);
tasks.put('/:id', updateTask);
tasks.put('/:project_id/assign/:task_id', assignTaskToUser);
tasks.delete('/:id', deleteTask);

export default tasks;
