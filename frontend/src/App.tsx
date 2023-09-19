import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Project,
  MyTask,
  Activity,
  Team,
  Message,
  Setting
} from './IndexForImport';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project" element={<Project />} />
          <Route path="/mytask" element={<MyTask />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/team" element={<Team />} />
          <Route path="/message" element={<Message />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
