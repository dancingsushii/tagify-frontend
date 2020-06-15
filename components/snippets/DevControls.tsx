import React from 'react';
import { Link, Route, Switch as RouteSwitch } from 'react-router-dom';

import {
    AppBar, Button, FormControlLabel, Slide, Switch, Toolbar, Typography
} from '@material-ui/core';

export function DevControls({ isLoggedIn, setIsLoggedIn }) {
  return (
    <AppBar style={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dev Controls
        </Typography>
        <Slide direction="up" in={isLoggedIn}>
          <Button component={Link} to={"/settings"}>
            Settings
          </Button>
        </Slide>
        <RouteSwitch>
          <Route path="/admin">
            <Button component={Link} to={"/"}>
              Home
            </Button>
          </Route>
          <Route path="/">
            <Button component={Link} to={"/admin"}>
              Admin
            </Button>
          </Route>
        </RouteSwitch>
        <FormControlLabel
          label="login"
          control={
            <Switch
              checked={isLoggedIn}
              onChange={(event) => setIsLoggedIn(event.target.checked)}
            />
          }
        />
      </Toolbar>
    </AppBar>
  );
}
