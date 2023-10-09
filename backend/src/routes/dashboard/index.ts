import express, { Router } from 'express';
import {
  getAllTasks,
  getTasksForProjectAndUser,
  addNewTask,
  updateTask,
  getProject,
} from '../../controllers/dashboard';

const dashboard: Router = express.Router();

dashboard.get('/', getAllTasks);
dashboard.get('/project/:project_id', getProject);
dashboard.get('/:project_id/:user_id', getTasksForProjectAndUser);
dashboard.post('/', addNewTask);
dashboard.put('/:id', updateTask);

export default dashboard;
