import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import { App as GuestApp } from './components/guest/App';
import { App as UserApp } from './components/user/App';
import { raleway200, raleway300 } from './fonts/Fonts';
import BackendToken, { Default, UserRole } from './utils/BackendAPI';

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
    fontFamily: "Raleway",
    fontSize: 17,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 300,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [raleway200, raleway300],
      },
    },
  },
});

function App() {
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let response = await Default.getUser();
      console.log(response);
      let code = response.responseCode;
      let role: UserRole | undefined =
        response.data?.role == "user"
          ? UserRole.User
          : response.data?.role == "admin"
          ? UserRole.Admin
          : undefined;
      BackendToken.authenticated = code == "Ok";
      BackendToken.userRole = role;
      BackendToken.nickname =
        response.data == undefined ? "" : response.data.nickname;
      if (BackendToken.userRole == UserRole.Admin)
        window.location.replace("/admin");
      setRender(true);
    })();
  }, []);

  return (
    <div>
      {render && (
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Switch>
              <Route path="/welcome" component={GuestApp} />
              <Route path="/login" component={GuestApp} />
              <Route path="/*" component={UserApp} />
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
