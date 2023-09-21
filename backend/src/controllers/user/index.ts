import { Request, Response } from "express"
import { adminFireAuth } from "../../firebase";

/*
export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req['user']['uid'];
    const user = await adminFireAuth.getUser(uid);
    res.status(200).send({user});
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(400).json({errorCode, errorMessage});
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const uid = req['user']['uid'];
    const {firstName, lastName, photoURL, phoneNumber} = req.body;
    const user = adminFireAuth.updateUser(uid, {
      displayName: `${firstName} ${lastName}`,
      photoURL,
      phoneNumber
    });
    res.status(200).send({user});
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(400).json({errorCode, errorMessage});
  }
};*/