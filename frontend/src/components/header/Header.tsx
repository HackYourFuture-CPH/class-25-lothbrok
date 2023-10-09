import React from 'react';
import SearchBar from '../searchBar/SearchBar';
import PageTitle from '../pageTitle/PageTitle';
import MenuLeftBar from '../menuMobile/MenuLeftBar';
import CustomDropdown from '../dropdown/CustomDropDown';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const handleSignOut = () => signOut(getAuth());
const Header = () => {
  const combinedClasses = `${styles.header} ${styles.container}`;
  return (
    <div className={combinedClasses}>
      <PageTitle />
      <div className={styles.burger_icon_btn}>
        <MenuLeftBar />
      </div>
      <div className={styles.logo}>
        <div className={styles.logo_icon_div}>
          <img src='/assets/icons/tablet-logo.svg' />
        </div>
        <h3>Dashhhboard</h3>
      </div>
      <div className={styles.header_right}>
        <SearchBar />
        <div className={styles.notification_icon_div}>
          <img src='/assets/icons/notification.svg' />
        </div>

        <div className={styles.img_account_div}>
          <img src='/assets/images/avatar.svg' alt='' />
          <CustomDropdown />
        </div>

        <Link className={styles.signOut} to='/login' onClick={handleSignOut}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Header;
