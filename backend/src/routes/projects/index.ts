import express, { Router } from 'express';
import { getAllProjects, getAmountOfTasks } from '../../controllers/projects';

const projects: Router = express.Router();

projects.get('/', getAllProjects);
projects.get('/:project_id/tasks/count', getAmountOfTasks);

export default projects;
