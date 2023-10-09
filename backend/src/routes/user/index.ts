import { registerUserToDb, updateUserByIdInDB, getUserById } from '../../controllers/user';
import express, { Router } from 'express';

const userRoute: Router = express.Router();

userRoute.get('/current/:uid', getUserById);
userRoute.put('/update', updateUserByIdInDB);
userRoute.post('/register', registerUserToDb);

export default userRoute;
