import express, {Router} from 'express';
import { registerUserToDb, updateUserById,getUserById} from '../../controllers/user';
import express, { Router } from 'express';

const userRoute: Router = express.Router();

userRoute.get('/current', getUserById);
userRoute.put('/update', updateUserById);
userRoute.post('/register', registerUserToDb);

export default userRoute;
