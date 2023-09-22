import React from "react";
import { Header, MenuDesktop } from "../../IndexForImport";

const MyTask = () => {
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

export default MyTask;