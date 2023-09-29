import React from 'react';
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
        <Header />
        <Outlet />
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Dashboard;
