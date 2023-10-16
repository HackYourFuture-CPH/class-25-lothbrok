import db from '../../config/db-config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await db('projects').select('*').from('projects');
    res.status(StatusCodes.OK).send(projects);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getAmountOfTasks = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  try {
    const projects = await db('tasks').count('* as tasks_count').where('project_id', project_id);
    const completed = await db('tasks')
      .count('* as tasks_count')
      .where('project_id', project_id)
      .where('completed', true);

    if (projects.length > 0 && 'tasks_count' in projects[0]) {
      const taskCount = {
        total: projects[0].tasks_count,
        completed: completed[0].tasks_count,
      };
      res.status(StatusCodes.OK).send(taskCount);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `No tasks found` });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
