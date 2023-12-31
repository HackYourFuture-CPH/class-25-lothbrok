import db from '../../config/db-config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllTasksOfProject = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  try {
    const tasks = await db('tasks').select('*').from('tasks').where('tasks.project_id', project_id);
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
    const { title, description, status, due_date, user_uid, completed, priority, project_id } =
      req.body;

    const task = await db('tasks')
      .insert({
        title,
        description,
        status,
        due_date,
        user_uid,
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

export const assignTaskToUser = async (req: Request, res: Response) => {
  const { task_id, project_id } = req.params;
  const { assignee } = req.body;

  try {
    const newAssignee = await db('users').where('uid', assignee).first();

    if (!newAssignee) {
      return res.status(StatusCodes.NOT_FOUND).send('Assignee not found in the users table.');
    }

    const isMember = await db('project_user_relation')
      .where({ project_id, user_uid: assignee })
      .first();

    if (!isMember) {
      return res.status(StatusCodes.FORBIDDEN).send('Assignee is not a member of the project.');
    }

    await db('tasks').where('id', task_id).update({ user_uid: newAssignee.uid });

    res.status(StatusCodes.OK).send('Task assignee updated successfully.');
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

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await db('tasks').where({ id }).del();
    if (data === 1) {
      res.status(204).send('Task deleted successfully');
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
