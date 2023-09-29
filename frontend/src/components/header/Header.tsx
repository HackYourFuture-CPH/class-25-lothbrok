import React from 'react';
import './Header.css';
import SearchBar from '../searchBar/SearchBar';
import PageTitle from '../pageTitle/PageTitle';
import MenuLeftBar from '../menuMobile/MenuLeftBar';
import CustomDropdown from '../dropdown/CustomDropDown';
const Header = () => {
  return (
    <div className='header container'>
      <PageTitle />
      <div className='burger-icon-btn'>
        <MenuLeftBar />
      </div>
      <div className='logo'>
        <div className='logo-icon-div'>
          <img src='/assets/icons/tablet-logo.svg' />
        </div>
        <h3>Dashhhboard</h3>
      </div>
      <div className='header-right'>
        <SearchBar />
        <div className='notification-icon-div'>
          <img src='/assets/icons/notification.svg' />
        </div>
        <div className='img-account-div'>
          <img src='/assets/images/avatar.svg' alt='' />
          <CustomDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
