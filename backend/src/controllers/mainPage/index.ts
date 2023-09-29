import { Request, Response } from 'express';

export const getAllTasks = (req: Request, res: Response) => {
  res.status(200).send({ message: 'Successfully got all the tasks' });
};
