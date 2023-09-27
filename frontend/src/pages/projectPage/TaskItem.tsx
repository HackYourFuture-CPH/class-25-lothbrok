import React from "react";
import "./TaskItem.css";

interface Project {
  id: number;
  title: string;
  thumbnail_link: string;
  date_of_creation: string;
  amount_of_tasks: number;
}

interface TaskItemProps {
  project: Project;
}

function TaskItem({ project }: TaskItemProps) {
  const { title, thumbnail_link, date_of_creation, amount_of_tasks } = project;

  const completedPercentage = (Math.random() * 100).toFixed(2);

  return (
    <div className="task-item">
      <div className="task-info">
        <img src={thumbnail_link} alt={title} />
        <h3>{title}</h3>
        <p>{date_of_creation}</p>
        <p> {amount_of_tasks}</p>
        <p className="percentage-out-of-line">{completedPercentage}%</p>
      </div>
      <div className="progress-bar">
        <div style={{ width: `${completedPercentage}%` }}></div>
      </div>
    </div>
  );
}

export default TaskItem;
