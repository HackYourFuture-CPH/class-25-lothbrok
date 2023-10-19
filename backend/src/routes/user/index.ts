import {
  registerUserToDb,
  updateUserByIdInDB,
  getUserById,
  getAllUsers,
  getUserNamesByUids,
} from '../../controllers/user';
import express, { Router } from 'express';

const userRoute: Router = express.Router();

userRoute.get('/:uid', getUserById);
userRoute.get('/', getAllUsers);
userRoute.post('/names', getUserNamesByUids);
userRoute.put('/', updateUserByIdInDB);
userRoute.post('/', registerUserToDb);

export default userRoute;
