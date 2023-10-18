import express, { Router } from 'express';
import {
  getAllProjects,
  getProject,
  getAmountOfTasks,
  getUsersOfProject,
  inviteUsersToProject,
  getProjectsOfUser,
  addNewProject,
} from '../../controllers/projects';

const projects: Router = express.Router();

projects.get('/all', getAllProjects);
projects.get('/:project_id', getProject);
projects.get('/:project_id/tasks/count', getAmountOfTasks);
projects.get('/:project_id/users', getUsersOfProject);
projects.get('/user/:user_uid', getProjectsOfUser);
projects.post('/:project_id/invite-users', inviteUsersToProject);
projects.post('/', addNewProject);

export default projects;
