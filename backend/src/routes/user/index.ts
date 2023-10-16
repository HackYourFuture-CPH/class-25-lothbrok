import { registerUserToDb, updateUserByIdInDB, getUserById } from '../../controllers/user';
import express, { Router } from 'express';

const userRoute: Router = express.Router();

userRoute.get('/:uid', getUserById);
userRoute.put('/', updateUserByIdInDB);
userRoute.post('/', registerUserToDb);

export default userRoute;
