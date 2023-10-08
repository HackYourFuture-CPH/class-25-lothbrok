import express, {Router} from 'express';
import { getAllTasks, getTasksForProjectAndUser,addNewTask} from '../../controllers/dashboard';

const dashboard: Router = express.Router();

dashboard.get('/', getAllTasks);
dashboard.get('/:project_id/:user_id',getTasksForProjectAndUser);
dashboard.post('/',addNewTask);

export default dashboard;