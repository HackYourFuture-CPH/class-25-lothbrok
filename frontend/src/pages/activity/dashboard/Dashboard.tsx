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
    <div>
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
