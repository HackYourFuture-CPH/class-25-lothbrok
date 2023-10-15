import db from '../../config/db-config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await db('tasks').select('*').from('tasks');
    res.status(StatusCodes.OK).send(tasks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getTasksForProjectAndUser = async (req: Request, res: Response) => {
  const { project_id, user_id } = req.params;

  try {
    const tasks = await db
      .select('tasks.*', 'projects.title as project_title', 'users.first_name', 'users.last_name')
      .from('tasks')
      .where({ 'tasks.project_id': project_id, 'tasks.user_uid': user_id })
      .leftJoin('projects', 'tasks.project_id', 'projects.id')
      .leftJoin('users', 'tasks.user_uid', 'users.uid');

    res.status(StatusCodes.OK).send(tasks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const addNewTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      due_date,
      user_uid,
      assignee,
      completed,
      priority,
      project_id,
    } = req.body;

    const task = await db('tasks')
      .insert({
        title,
        description,
        status,
        due_date,
        user_uid,
        assignee,
        completed,
        priority,
        project_id,
      })
      .returning('*');
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await db('tasks').where({ id });
    if (data.length > 0) {
      await db('tasks').where({ id }).update(req.body);
    }
    res.status(StatusCodes.OK).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getProject = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  try {
    const project = await db.select('*').from('projects').where({ id: project_id }).first();
    project
      ? res.status(StatusCodes.OK).json(project)
      : res.status(StatusCodes.NOT_FOUND).json({ error: 'Project not found' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  const { user_uid } = req.params;
  try {
    const projects = await db.select('*').from('projects').where({ user_uid });
    res.status(StatusCodes.OK).send(projects);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const addNewProject = async (req: Request, res: Response) => {
  try {
    const { title, description, thumbnail_link, date_of_creation, user_uid } = req.body;

    const project = await db('projects')
      .insert({
        title,
        description,
        thumbnail_link,
        date_of_creation,
        user_uid,
      })
      .returning('*');
    res.status(StatusCodes.CREATED).json(project);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
