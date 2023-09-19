import {Router} from 'express';
import authController from '../../controllers/auth';

const auth = Router();

auth.get('/test', authController.testAuth)
auth.post('/sign-in', authController.login);
auth.post('/sign-up', authController.signUp);
auth.post('/forgot-password', authController.forgotPas);

export default auth;