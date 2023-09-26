import React from "react";
import TaskItem from "./TaskItem";

interface Project {
  id: number;
  title: string;
  thumbnail_link: string;
  date_of_creation: string;
  amount_of_tasks: number;
  user_id: number;
}

interface TaskListProps {
  projects: Project[];
}

function TaskList({ projects }: TaskListProps) {
  return (
    <div className="task-list">
      {projects.map((project) => (
        <TaskItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default TaskList;
