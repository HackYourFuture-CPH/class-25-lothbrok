import React from 'react';
import './Project.css'
import { Header, MenuDesktop } from "../../IndexForImport";

const Project = () => {
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
}

export default Project;