import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import { Header, MenuDesktop } from "../../IndexForImport";
import React, { useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, []);

  const handleSignOut = () => signOut(getAuth());

  return (
    <div className="pages">
      <div className="menu-desktop">
        <MenuDesktop />
      </div>
      <div className="main">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
