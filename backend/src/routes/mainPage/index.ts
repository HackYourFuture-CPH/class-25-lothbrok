import express, {Router} from 'express';
import { getAllTasks } from '../../controllers/mainPage';

const mainPageRoute: Router = express.Router();

mainPageRoute.get('/', getAllTasks);

export default mainPageRoute;