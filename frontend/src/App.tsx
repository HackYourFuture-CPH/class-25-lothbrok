import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Dashboard,
  Project,
  MyTask,
  Activity,
  Team,
  Message,
  Setting,
  ErrorPage,
} from "./IndexForImport";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import SignUp from "./pages/signUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/mytask",
        element: <MyTask />,
      },
      {
        path: "/activity",
        element: <Activity />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

