import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import stylesDesktop from './MenuDesktop.module.css';
import styles from '../menuMobile/MenuLeftBar.module.css';

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
      <div className={styles.logo_div}>
        <img className={styles.logo_menu} src='/assets/icons/logo-menu.svg' alt='Logo' />
        <h4>Dashhhboard</h4>
        <img className={styles.logo_menu} src='/assets/icons/plus.svg' alt='Plus Icon' />
      </div>
      <List className={styles.list_top}>
        {['Dashboard', 'Project', 'My Task', 'Activity', 'Team', 'Message', 'Setting'].map(
          (text, index) => (
            <ListItem key={text} disablePadding className={styles.list_item}>
              <ListItemButton>
                <Link
                  className={styles.list_item_link}
                  to={index === 0 ? '/' : `/${text.split(' ').join('').toLowerCase()}`}
                >
                  <ListItemIcon>
                    <img
                      className={styles.icons}
                      src={`/assets/icons/${icons[index]}.svg`}
                      alt={`${text}-icon`}
                    />
                  </ListItemIcon>
                  <ListItemText className={styles.list_name} primary={text} />
                </Link>
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
      <List id={styles.list_bottom}>
        {['Workspace', 'Superboard'].map((text, index) => (
          <ListItem key={text} disablePadding className={index >= 7 ? 'last-two-items' : ''}>
            <ListItemButton>
              <Link className={styles.list_item_link} to={`/${text.toLowerCase()}`}>
                <ListItemIcon>
                  <img
                    className={styles.icons}
                    src={`/assets/icons/${icons.slice(-2)[index]}.svg`}
                    alt={`${text}-icon`}
                  />
                </ListItemIcon>
                <ListItemText className={styles.list_name} primary={text} />
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
    <div className={stylesDesktop.desktop_left_bar}>
      <Menu />
    </div>
  );
};

export default MenuDesktop;
