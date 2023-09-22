import React from "react";
import "./Dashboard.css";
import { Header, MenuDesktop } from "../../IndexForImport";

const Dashboard = () => {
  return (
    <div className="pages">
      <div className="menu-desktop">
        <MenuDesktop />
      </div>
      <div className="main">
        <Header />
      </div>
    </div>
  );
};

export default Dashboard;