import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch as RouteSwitch } from 'react-router-dom';

import {
    AppBar, Button, createMuiTheme, CssBaseline, FormControlLabel, Slide, Switch, ThemeProvider,
    Toolbar, Typography
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import { App as AdminApp } from './components/admin/App';
import { App as GuestApp } from './components/guest/App';
import { App as UserApp } from './components/user/App';

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: blue,
  },
});

function App() {
  // this value gets defined by an api call
  // to the backend.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dev, setDev] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouteSwitch>
          <Route path="/admin" component={AdminApp} />
          <Route path="/" component={isLoggedIn ? UserApp : GuestApp} />
        </RouteSwitch>
        {dev && (
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
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
