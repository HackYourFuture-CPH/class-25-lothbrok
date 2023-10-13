import express, { Router } from 'express';
import auth from './auth';
import projects from './projects';
import tasks from './tasks';
import userRoute from './user';
import { validateAuth } from '../helpers/auth';

const router: Router = express.Router();

router.use('/auth', auth);
router.use('/user', userRoute);
router.use('/project', validateAuth, projects);
router.use('/project/tasks', validateAuth, tasks);

export default router;
