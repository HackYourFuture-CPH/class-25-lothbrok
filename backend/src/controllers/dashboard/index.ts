import db from "../../config/db-config";
import { Request, Response } from "express";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await db("project_management_db").select("*").from("tasks");
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
};

export const getTasksForProjectAndUser = async (
  req: Request,
  res: Response
) => {
  const { project_id, user_id } = req.params;

  try {
    const tasks = await db
      .select(
        "tasks.description",
        "projects.title as project_title",
        "users.first_name",
        "users.last_name"
      )
      .from("tasks")
      .where({ "tasks.project_id": project_id, "tasks.user_id": user_id })
      .leftJoin("projects", "tasks.project_id", "projects.id")
      .leftJoin("users", "tasks.user_id", "users.id");

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({ error: "Unable to fetch tasks" });
  }
};

export const addNewTask = async (req: Request, res: Response) => {

  try {
    const {
      description,
      status,
      due_date,
      user_id,
      assignee,
      completed,
      priority,
      project_id,
    } = req.body;

    // Use Knex.js to insert a new task into the "tasks" table
    await db("tasks").insert({
      description,
      status,
      due_date,
      user_id,
      assignee,
      completed,
      priority,
      project_id,
    });

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    // Send an error response if there's an issue
    res.status(500).json({ error: "Unable to create task" });
  }
};
