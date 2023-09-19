import React from 'react';
import './App.css';
import useBearStore from './store/example.store';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import useTestHook from './hooks/test.hook';
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

function App() {
  const { bears, increase } = useBearStore();

  useTestHook();

  return (
    <div className="App">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            The amount of Bears {bears}
          </Typography>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project" element={<Project />} />
              <Route path="/mytask" element={<MyTask />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/team" element={<Team />} />
              <Route path="/message" element={<Message />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </BrowserRouter>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => increase(1)}>
            Increase Bears
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default App;
