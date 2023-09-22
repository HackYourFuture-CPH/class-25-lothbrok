import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import './MenuDesktop.css'


const icons = ['dashboard', 'project', 'mytask', 'activity', 'team', 'message', 'setting', 'workspace', 'superboard'];

const MenuDesktop = () => {
  return (
    <div className='desktop-left-bar'>
      <div className='logo-div'>
        <img className='logo-menu' src='/assets/icons/logo-menu.png' alt='Logo' />
        <h4>Dashhhboard</h4>
        <img className='logo-menu' src='/assets/icons/plus.png' alt='Plus Icon' />
      </div>
      <List className='list-top'>
        {['Dashboard', 'Project', 'My Task', 'Activity', 'Team', 'Message', 'Setting'].map((text, index) => (
          <ListItem key={text} disablePadding className='list-item'>
            <ListItemButton>
              <Link className='list-item-link' to={index === 0 ? '/' : `/${text.split(' ').join('').toLowerCase()}`}>
                <ListItemIcon>
                  <img className="icons" src={`/assets/icons/${icons[index]}.png`} alt={`${text}-icon`} />
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
                  <img className="icons" src={`/assets/icons/${icons.slice(-2)[index]}.png`} alt={`${text}-icon`} />
                </ListItemIcon>
                <ListItemText className='list-name' primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuDesktop;