import React from 'react';
import './App.css';
import useBearStore from './store/example.store';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import useTestHook from './hooks/test.hook';

function App() {
  const {bears, increase} = useBearStore();

  useTestHook();

  return (
    <div className="App">
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          The amount of Bears {bears}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => increase(1)}>Increase Bears</Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default App;
