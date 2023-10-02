import {
  registerUserToDb,
  updateUserByIdInDB,
  getUserById,
  updateProfileInFirebase,
} from '../../controllers/user';
import express, { Router } from 'express';

const userRoute: Router = express.Router();

userRoute.get('/current', getUserById);
userRoute.put('/update', updateUserByIdInDB, updateProfileInFirebase);
userRoute.post('/register', registerUserToDb);

export default userRoute;
