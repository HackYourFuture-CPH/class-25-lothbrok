import React from "react";
import "./Header.css";
import SearchBar from "../searchBar/SearchBar";
import PageTitle from "../pageTitle/PageTitle";

const Header = () => {
  return (
    <div className="header container">
      <PageTitle />
      <button className="burger-icon-btn">
        <img className="image-Arash" src="/assets/icons/burger.png"/>
      </button>
      <div className="logo">
        <div className="logo-icon-div">
          <img className="image-Arash" src="/assets/icons/tablet-icon.png"/>
        </div>
        <h3>Dashboard</h3>
      </div>
      <div className="header-right">
        <SearchBar />
        <div className="notification-icon-div">
          <img className="image-Arash"  src="/assets/icons/notification.png"/>
        </div>
        <div className="img-account-div">
          <img className="image-Arash" src="/assets/images/account.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
