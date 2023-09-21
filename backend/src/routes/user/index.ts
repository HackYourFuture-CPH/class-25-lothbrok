import express, {Router} from 'express';
import { getUserById, updateUserById } from '../../controllers/user';

const userRoute: Router = express.Router();

userRoute.get('/current', getUserById);
userRoute.get('/update', updateUserById);

export default userRoute;