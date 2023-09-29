import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import './MenuDesktop.css';

const icons = [
  'dashboard',
  'project',
  'mytask',
  'activity',
  'team',
  'message',
  'setting',
  'workspace',
  'superboard',
];

export const Menu = () => {
  return (
    <>
      <div className='logo-div'>
        <img className='logo-menu' src='/assets/icons/logo-menu.svg' alt='Logo' />
        <h4>Dashhhboard</h4>
        <img className='logo-menu' src='/assets/icons/plus.svg' alt='Plus Icon' />
      </div>
      <List className='list-top'>
        {['Dashboard', 'Project', 'My Task', 'Activity', 'Team', 'Message', 'Setting'].map(
          (text, index) => (
            <ListItem key={text} disablePadding className='list-item'>
              <ListItemButton>
                <Link
                  className='list-item-link'
                  to={index === 0 ? '/' : `/${text.split(' ').join('').toLowerCase()}`}
                >
                  <ListItemIcon>
                    <img
                      className='icons'
                      src={`/assets/icons/${icons[index]}.svg`}
                      alt={`${text}-icon`}
                    />
                  </ListItemIcon>
                  <ListItemText className='list-name' primary={text} />
                </Link>
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
      <List id='list-bottom'>
        {['Workspace', 'Superboard'].map((text, index) => (
          <ListItem key={text} disablePadding className={index >= 7 ? 'last-two-items' : ''}>
            <ListItemButton>
              <Link className='list-item-link' to={`/${text.toLowerCase()}`}>
                <ListItemIcon>
                  <img
                    className='icons'
                    src={`/assets/icons/${icons.slice(-2)[index]}.svg`}
                    alt={`${text}-icon`}
                  />
                </ListItemIcon>
                <ListItemText className='list-name' primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const MenuDesktop = () => {
  return (
    <div className='desktop-left-bar'>
      <Menu />
    </div>
  );
};

export default MenuDesktop;
