import express, {Router} from 'express';
import { registerUserToDb, updateUserById,getUserById} from '../../controllers/user';//getUserById, updateUserById, 

const userRoute: Router = express.Router();

userRoute.get('/current', getUserById);
userRoute.put('/update', updateUserById);
userRoute.post('/register', registerUserToDb);

export default userRoute;