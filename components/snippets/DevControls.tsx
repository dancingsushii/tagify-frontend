import React from 'react';
import { Link, Route, Switch as RouteSwitch } from 'react-router-dom';

import { AppBar, Button, FormControlLabel, Switch, Toolbar, Typography } from '@material-ui/core';

// import { TagifyButton } from './TagifyButton';

export function DevControls({ isLoggedIn, setIsLoggedIn }) {
  return (
    <AppBar style={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dev Controls
        </Typography>
        {isLoggedIn && (
          <Button component={Link} to={"/settings"}>
            Settings
          </Button>
        )}
        <RouteSwitch>
          <Route path="/admin">
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              component={Link}
              to={"/"}
            >
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
