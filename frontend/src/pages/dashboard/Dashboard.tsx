import React from "react";
import "./Dashboard.css";
import { Header } from "../../IndexForImport";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <h2>This is Dashboard page</h2>
      <div className="link-container">
        <Link to="/project">Project</Link>
        <Link to="/mytask">My Task</Link>
        <Link to="/activity">Activity</Link>
        <Link to="/team">Team</Link>
        <Link to="/message">Message</Link>
        <Link to="/setting">Setting</Link>
      </div>
    </div>
  );
};

export default Dashboard;