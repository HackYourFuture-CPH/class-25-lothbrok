import React from "react";
import "./ProjectDetailsTitle.css";
import { CheckCircleRounded, AccountCircleRounded, CalendarMonthRounded, FlagRounded } from "@mui/icons-material/";

const ProjectDetailsTitle = () => {
  return (
    <div className="details-title">
      <div className="project-name">
        <CheckCircleRounded id="check-icon" />
        <div className="label">
          <p>Bookum App</p>
          <h6>Design feedback on wireframe</h6>
        </div>
      </div>
      <div className="project-owner">
        <div className="details-topic">
          <p>Assignee</p>
          <p>Due date</p>
          <p>Priority</p>
          <p>Status</p>
        </div>
        <div className="details-status">
          <div className="status">
          <div className="icon-and-name">
            {/* <img src="" alt="avatar" className="avatar"/> */}
            <AccountCircleRounded/>
            <p>Jackson Pierce</p>
          </div>
          </div>
          <div className="status">
          <div className="icon-and-name">
            <CalendarMonthRounded/>
            <p>7 October</p>
          </div>
          </div>
          <div className="status">
          <div className="icon-and-name">
            <FlagRounded/>
            <p>Medium</p>
          </div>
          </div>
          <div className="status">
          <div className="status-box">
            <p>Ongoing</p>
          </div>
          </div>
        </div>
      </div>
      <textarea className="description" >Description...</textarea>
    </div>
  );
};

export default ProjectDetailsTitle;