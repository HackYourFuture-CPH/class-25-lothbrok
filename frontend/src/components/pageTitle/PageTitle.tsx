import React from "react";
import "./PageTitle.css";
import { useLocation } from "react-router-dom";

type pagetitleMapType = {
  [key: string]: string;
};

const pagetitleMap: pagetitleMapType = {
  "/": "Dashboard",
  "/project": "Project",
  '/mytask': "My task",
  "/activity": "Activity",
  "/team": "Team",
  "/message": "Message",
  "/setting": "Setting",
};

const PageTitle = () => {
  const location = useLocation();
  const path = location.pathname;
  const pageTitle = pagetitleMap[path];
  
  return <h2>{pageTitle}</h2>;
};

export default PageTitle;
