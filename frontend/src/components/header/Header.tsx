import React, {useState} from "react";
import "./Header.css";
import SearchBar from "../searchBar/SearchBar";
import PageTitle from "../pageTitle/PageTitle";
import MenuLeftBar from "../MenuLeftBar/MenuLeftBar";

const Header = () => {

  return (
    <div className="header container">
      <PageTitle />
      <div className="burger-icon-btn" >
        <MenuLeftBar/>
      </div>
      <div className="logo">
        <div className="logo-icon-div">
          <img className="image-Arash" src="/assets/icons/tablet-logo.svg"/>
        </div>
        <h3>Dashboard</h3>
      </div>
      <div className="header-right">
        <SearchBar />
        <div className="notification-icon-div">
          <img className="image-Arash"  src="/assets/icons/notification.svg"/>
        </div>
        <div className="img-account-div">
          <img className="image-Arash" src="/assets/images/account.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;