import express, { Router } from 'express';
import { getAllProjects, getAmountOfTasks, getUsersOfProject } from '../../controllers/projects';

const projects: Router = express.Router();

projects.get('/', getAllProjects);
projects.get('/:project_id/tasks/count', getAmountOfTasks);
projects.get('/:project_id/users', getUsersOfProject);
export default projects;
