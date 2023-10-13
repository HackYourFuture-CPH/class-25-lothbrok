import * as React from 'react';
import { Menu, MenuItem, Dropdown, MenuButton } from '@mui/base';
import styles from './CustomDropdown.module.css'; // Import the CSS file

export default function CustomDropdown() {
  return (
    <Dropdown>
      <MenuButton className={styles.TriggerButton}>Jakson Peterson</MenuButton>

      <Menu className={styles.CustomMenu}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>settings</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
}
