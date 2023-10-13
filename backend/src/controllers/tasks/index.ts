import db from '../../config/db-config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllTasksForProject = async (req: Request, res: Response) => {
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

export const assignTaskToUser = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  const { assignee, title, description, status, completed, priority, due_date } = req.body; // Assuming the task details are in the request body

  try {
    const projectUsers = await db('project_user_relation')
      .select('user_uid')
      .where('project_id', project_id);

    const isUserMember = projectUsers.some((user) => user.user_uid === assignee);

    if (isUserMember) {
      const assigneeData = await db('users')
        .select('first_name', 'last_name')
        .where('uid', assignee)
        .first();

      if (assigneeData) {
        await db('tasks').insert({
          assignee: `${assigneeData.first_name} ${assigneeData.last_name}`,
          title,
          description,
          status,
          completed,
          priority,
          due_date,

          project_id,
        });

        res.status(StatusCodes.OK).send('Task assigned successfully.');
      } else {
        res.status(StatusCodes.NOT_FOUND).send('Assignee not found in the users table.');
      }
    } else {
      res.status(StatusCodes.FORBIDDEN).send('User is not a member of the project.');
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
