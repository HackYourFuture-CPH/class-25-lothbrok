import React, { useEffect } from 'react';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  signOut,
  User,
  getAuth,
  onAuthStateChanged
} from '@firebase/auth';
import { Header } from '../../IndexForImport';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleSignOut = () => signOut(getAuth());

  // const checkToken = () => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, async (user: User | null) => {
  //     if (user) {
  //       try {
  //         const accessToken = await user.getIdTokenResult();
  //         const res = await fetch('api/main-page', {
  //           method: 'GET',
  //           headers: {
  //             'Authorization': `Bearer ${accessToken.token}`
  //           }
  //         });
  //         res.ok ? navigate('/') : navigate('/login');
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     } else {
  //       navigate('/login');
  //     }
  //   });
  // };

  // useEffect(() => {
  //   checkToken();
  // }, []);

  return (
    <div>
      <Header />
      <h2>This is Dashboard page</h2>
      <div className="link-container">
        <Link to="/project">Project</Link>
        <Link to="/mytask">My Task</Link>
        <Link to="/activity">Activity</Link>
        <Link to="/team">Team</Link>
        <Link to="/message">Message</Link>
        <Link to="/setting">Setting</Link>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Dashboard;

