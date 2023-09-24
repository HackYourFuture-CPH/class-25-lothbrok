import React, {useState} from 'react';
import './MenuLeftBar.css'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Box, Divider, Button } from '@mui/material/';
import { Link } from 'react-router-dom';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

const icons = ['dashboard', 'project', 'mytask', 'activity', 'team', 'message', 'setting', 'workspace', 'superboard']

const MenuLeftBar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="swipeableDrawer"
    > 
      <div className='logo-div'>
        <img className='logo-menu' src='/assets/icons/logo-menu.svg'/>
        <h4>Dashhhboard</h4>
        <img className='logo-menu' src='/assets/icons/plus.svg'/>
      </div>
      <List className='list-top'>
        {['Dashboard', 'Project', 'My Task', 'Activity', 'Team', 'Message', 'Setting'].map((text, index) => (
          <ListItem key={text} disablePadding className='list-item'>
            <ListItemButton>
              <Link className='list-item-link' to={index === 0 ? '/' : `/${text.toLowerCase()}`}>
                <ListItemIcon>
                  <img className="icons" src={`/assets/icons/${icons[index]}.svg`} alt={`${text}-icon`} />
                </ListItemIcon>
                <ListItemText className='list-name' primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <List id='list-bottom'>
        {['Workspace', 'Superboard'].map((text, index) => (
          <ListItem key={text} disablePadding className={index >= 7 ? 'last-two-items' : ''}>
            <ListItemButton>
              <Link className='list-item-link' to={`/${text.toLowerCase()}`}>
                <ListItemIcon>
                  <img className="icons" src={`/assets/icons/${icons.slice(-2)[index]}.svg`}  />
                </ListItemIcon>
                <ListItemText className='list-name' primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const anchor: Anchor = 'left'; // Defining the anchor for the Button

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>
        <img className="burger-btn" src="/assets/icons/burger.svg"/>
      </Button> 
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  );
}


export default MenuLeftBar;