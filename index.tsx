import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch as RouteSwitch } from 'react-router-dom';

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

import { App as AdminApp } from './components/admin/App';
import { App as GuestApp } from './components/guest/App';
import { DevControls } from './components/snippets/DevControls';
import { App as UserApp } from './components/user/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#dcedc8",
      light: "#fffffb",
      dark: "#aabb97",
      contrastText: "#000000",
    },
    secondary: {
      main: "#d9c8ed",
      light: "#fffbff",
      dark: "#a797bb",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: `"Raleway", sans-serif`,
    fontSize: 17,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 300,
  },
});

function App() {
  // this value gets defined by an api call
  // to the backend.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dev] = useState<boolean>(true);

  return (
    <div style={{ overflowX: "hidden" }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouteSwitch>
            <Route path="/admin" component={AdminApp} />
            <Route path="/" component={isLoggedIn ? UserApp : GuestApp} />
          </RouteSwitch>
          {dev && (
            <DevControls
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
