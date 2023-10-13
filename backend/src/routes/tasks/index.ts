import express, { Router } from 'express';
import {
  getAllTasksForProject,
  getTasksForProjectAndUser,
  addNewTask,
  updateTask,
  assignTaskToUser,
} from '../../controllers/tasks';

const tasks: Router = express.Router();

tasks.get('/:project_id/', getAllTasksForProject);
tasks.get('/:project_id/:user_id', getTasksForProjectAndUser);
tasks.post('/', addNewTask);
tasks.put('/:id', updateTask);
tasks.post('/:project_id/assign-task', assignTaskToUser);

export default tasks;
