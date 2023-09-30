import { Request, Response } from 'express';
import { adminFireAuth } from '../../firebase';
import { user } from '../../interfaces/user';
import db from '../../config/db-config';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    const user = await adminFireAuth.getUser(uid);
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;

    const { first_name, last_name, photourl, phone_number } = req.body;
    const user = await adminFireAuth.updateUser(uid, {
      displayName: `${first_name},${last_name}`,
      photoURL: photourl,
      phoneNumber: phone_number,
    });

    const userInfo = await db('users')
      .where('id', uid)
      .update(first_name, last_name, photourl, phone_number);

    res.status(200).send({ user, userInfo });
  } catch (error) {
    res.status(400).json(error);
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

    res.status(200).send({ newUser });
  } catch (error) {
    res.status(400).json(error);
  }
};
