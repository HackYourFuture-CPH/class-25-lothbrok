import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import { Header, MenuDesktop } from "../../IndexForImport";
import React, { useEffect } from "react";
import "./Dashboard.css";
import firebase from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { signOut, User, getAuth, onAuthStateChanged } from "@firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleSignOut = () => signOut(getAuth());

  const checkToken = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const accessToken = await user.getIdTokenResult();
          const res = await fetch("api/main-page", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken.token}`,
            },
          });
          res.ok ? navigate("/") : navigate("/login");
        } catch (e) {
          console.error(e);
        }
      } else {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="pages">
      <div className="menu-desktop">
        <MenuDesktop />
      </div>
      <div className="main">
        <Header />
        <Outlet />
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Dashboard;
