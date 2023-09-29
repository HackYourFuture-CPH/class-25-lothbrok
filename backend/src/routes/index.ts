import express, { Router } from 'express';
import auth from './auth';
import mainPageRoute from './mainPage';

import { validateAuth } from '../helpers/auth';

const router: Router = express.Router();

router.use('/auth', auth);
router.use('/main-page', validateAuth, mainPageRoute);

export default router;
