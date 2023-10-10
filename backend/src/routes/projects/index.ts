import express, { Router } from 'express';
import { getAllProjects, getAmountOfTasks } from '../../controllers/projects';

const projects: Router = express.Router();

projects.get('/', getAllProjects);
projects.get('/amount_of_tasks/:project_id', getAmountOfTasks);

export default projects;
