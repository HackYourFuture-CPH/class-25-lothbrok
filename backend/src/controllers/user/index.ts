import { Request, Response } from 'express';
import { adminFireAuth } from '../../firebase';
import { user } from '../../interfaces/user';
import db from '../../config/db-config';
import { StatusCodes } from 'http-status-codes';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    const user = await db('users').where({ uid });
    res.status(StatusCodes.OK).send({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const updateUserByIdInDB = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;

    const { first_name, last_name, photourl, phone_number } = req.body;

    const userInfo = await db('users')
      .where('uid', uid)
      .update(first_name, last_name, photourl, phone_number);
    if (!userInfo) {
      res.status(StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).send({ userInfo });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const registerUserToDb = async (req: Request, res: Response) => {
  try {
    const { uid, first_name, last_name, email, photourl, phone_number }: user = req.body;

    const newUser = await db('users').insert({
      uid,
      first_name,
      last_name,
      email,
      photourl,
      phone_number,
    });

    res.status(StatusCodes.OK).send({ newUser });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
