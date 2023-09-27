import * as React from "react";
import { Menu, MenuItem, Dropdown, MenuButton } from "@mui/base";
import "./CustomDropdown.css"; // Import the CSS file

export default function CustomDropdown() {
  return (
    <Dropdown>
      <MenuButton className="TriggerButton">Jakson Peterson</MenuButton>

      <Menu className="CustomMenu">
        <MenuItem>Profile</MenuItem>
        <MenuItem>settings</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
}
