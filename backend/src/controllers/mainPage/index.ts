
import { Request, Response } from "express";
const knex = require("knex");

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await knex("project_management_db").select("*").from('tasks');
    res.json(tasks); 
    console.log(tasks)  //;send({message:"Sucefully got all tasks"})
  } catch (error) {
    console.log(error);
  }
};
