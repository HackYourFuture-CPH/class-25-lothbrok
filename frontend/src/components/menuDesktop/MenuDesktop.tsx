import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from './MenuDesktop.module.css';
import { useState } from 'react';

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
  const location = useLocation();
  const getPath = (input: string) => input.split(' ').join('').toLowerCase();
  return (
    <>
      <div className={styles.logo_div}>
        <img className={styles.logo_menu} src='/assets/icons/logo-menu.svg' alt='Logo' />
        <h4>Dashhhboard</h4>
      </div>
      <List className={styles.list_top}>
        {['Dashboard', 'Project', 'My Task', 'Activity', 'Team', 'Message', 'Setting'].map(
          (text, index) => (
            <Link
              key={text}
              className={styles.list_item_link}
              to={index === 0 ? '/' : `/${getPath(text)}`}
            >
              <ListItem
                disablePadding
                className={`${styles.list_item} ${
                  (location.pathname === '/' && text === 'Dashboard') ||
                  location.pathname.includes(getPath(text))
                    ? styles.current_path
                    : ''
                }`}
              >
                <ListItemButton>
                  <ListItemIcon style={{ minWidth: '1.25rem', paddingRight: '1rem' }}>
                    <img
                      className={styles.icons}
                      src={`/assets/icons/${icons[index]}.svg`}
                      alt={`${text}-icon`}
                    />
                  </ListItemIcon>
                  <div className={styles.list_name}>{text}</div>
                </ListItemButton>
              </ListItem>
            </Link>
          ),
        )}
      </List>
      <List id={styles.list_bottom}>
        {['Workspace', 'Superboard'].map((text, index) => (
          <ListItem key={text} disablePadding className={index >= 7 ? 'last-two-items' : ''}>
            {text !== 'Workspace' ? (
              <ListItemIcon style={{ minWidth: '1.25rem', padding: '0 1rem' }}>
                <img
                  className={styles.icons}
                  src={`/assets/icons/${icons.slice(-2)[index]}.svg`}
                  alt={`${text}-icon`}
                />
              </ListItemIcon>
            ) : null}
            <div className={styles.list_name}>{text}</div>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const MenuDesktop = () => {
  return (
    <div className={styles.desktop_left_bar}>
      <Menu />
    </div>
  );
};

export default MenuDesktop;
