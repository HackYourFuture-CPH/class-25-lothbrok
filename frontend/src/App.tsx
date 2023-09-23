import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom";
import { Dashboard, Project, MyTask, Activity, Team, Message, Setting} from "./IndexForImport";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import SignUp from "./pages/signUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "subpage/:pageId",
        element: <Project />,
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




// import React from 'react';
// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {Dashboard, Project, MyTask, Activity, Team, Message, Setting} from './IndexForImport';
// import ForgotPassword from './pages/forgotPassword/ForgotPassword';
// import ResetPassword from './pages/resetPassword/ResetPassword';
// import SignUp from './pages/signUp/SignUp';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/project" element={<Project />} />
//           <Route path="/mytask" element={<MyTask />} />
//           <Route path="/activity" element={<Activity />} />
//           <Route path="/team" element={<Team />} />
//           <Route path="/message" element={<Message />} />
//           <Route path="/setting" element={<Setting />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
