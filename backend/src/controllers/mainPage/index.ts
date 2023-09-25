import db from "../../config/db-config"
import { Request, Response } from "express";


export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await db("project_management_db").select("*").from('tasks');
    res.json(tasks); 
    console.log(tasks)  
  } catch (error) {
    console.log(error);
  }
};
