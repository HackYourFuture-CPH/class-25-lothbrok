import React from 'react';
import firebase from 'firebase/app';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';
import { Header, MenuDesktop } from '../../IndexForImport';
import './Dashboard.css';
import { signOut, getAuth } from '@firebase/auth';

const Dashboard = () => {
  const handleSignOut = () => signOut(getAuth());

  return (
    <div className='pages'>
      <div className='menu-desktop'>
        <MenuDesktop />
      </div>
      <div className='main'>
        <button onClick={handleSignOut}>Sign out</button>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
