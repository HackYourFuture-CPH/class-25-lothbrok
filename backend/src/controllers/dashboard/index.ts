import db from '../../config/db-config';
import { Request, Response } from 'express';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await db('tasks').select('*').from('tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getTasksForProjectAndUser = async (req: Request, res: Response) => {
  const { project_id, user_id } = req.params;

  try {
    const tasks = await db
      .select(
        'tasks.description',
        'projects.title as project_title',
        'users.first_name',
        'users.last_name',
      )
      .from('tasks')
      .where({ 'tasks.project_id': project_id, 'tasks.user_id': user_id })
      .leftJoin('projects', 'tasks.project_id', 'projects.id')
      .leftJoin('users', 'tasks.user_id', 'users.id');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
};

export const addNewTask = async (req: Request, res: Response) => {
  try {
    const { description, status, due_date, user_id, assignee, completed, priority, project_id } =
      req.body;

    await db('tasks').insert({
      description,
      status,
      due_date,
      user_id,
      assignee,
      completed,
      priority,
      project_id,
    });

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create task' });
  }
};
