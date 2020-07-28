import React, { forwardRef } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import ExitIcon from "@material-ui/icons/PowerSettingsNew";

import BackendToken, { Admin, Status } from "../../utils/BackendAPI";

export function MyLogoutButton(props) {
  const handleClick = () => {
    return Admin.logout().then((response) => {
      if (response.status === Status.Ok) {
        BackendToken.logout();
        window.location.replace("/welcome");
      } else {
        alert("Failed to logout");
      }
    });
  };

  return (
    <MenuItem onClick={handleClick}>
      <ExitIcon /> Logout
    </MenuItem>
  );
}

export const MyAuthProvider = {
  login: (params) => Promise.resolve(),
  logout: (params) => Promise.resolve(),
  checkAuth: (params) => Promise.resolve(),
  checkError: (error) => Promise.resolve(),
  getPermissions: (params) => Promise.resolve(),
};

export default MyLogoutButton;
