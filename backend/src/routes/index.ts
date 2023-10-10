import express, { Router } from 'express';
import auth from './auth';
import dashboard from './dashboard';
import projects from './projects';
import userRoute from './user';
import { validateAuth } from '../helpers/auth';

const router: Router = express.Router();

router.use('/auth', auth);
router.use('/dashboard', validateAuth, dashboard);
router.use('/user', userRoute);
router.use('projects', validateAuth, projects);

export default router;
