import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';

import logo from '../../assets/tagify_icon.svg';
import { mapRoute } from '../../utils/Utils';
import { Impressum } from '../Impressum';
import { TagifyNavigation } from '../snippets/TagifyNavigation';
import { Login } from './Login';
import { Welcome } from './Welcome';

export function App() {
  const routes: Array<string> = ["/login"];

  const TabBar = () => (
    <Route
      path="/"
      render={() => (
        <Tabs value={mapRoute(location.pathname, { prefix: routes })}>
          <Tab
            label={<div>Login</div>}
            value="/login"
            component={Link}
            to={"/login"}
          />
        </Tabs>
      )}
    />
  );

  document.body.style.position = "relative";

  return (
    <>
      <TagifyNavigation
        appbar={
          <div style={{ width: "100%" }}>
            <Box display="flex" flexDirection="row" p={1} m={1}>
              {location.pathname !== "/welcome" && (
                <Box p={1}>
                  <Link to="/">
                    <img src={logo} width="150" />
                  </Link>
                </Box>
              )}
              <Box flexGrow={1} p={1} />
              <Box p={1}>
                <TabBar />
              </Box>
            </Box>
          </div>
        }
        transparent={true}
        footer={
          <Grid container>
            <Grid item xs={6}>
              <Box p={1}>
                <img src={logo} width="150" />
                <Typography variant="body2" color="textSecondary">
                  {"Copyright © "}
                  <a
                    color="inherit"
                    href="https://github.com/Luis-Hebendanz/tagify"
                  >
                    Github repository
                  </a>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={1} textAlign="right">
                <Typography variant="body2" color="textSecondary">
                  <Link color="inherit" to="/impressum">
                    Impressum
                  </Link>
                </Typography>
              </Box>
              <Box p={1} textAlign="right">
                <Typography variant="body2" color="textSecondary">
                  <a
                    color="inherit"
                    href="https://www.notion.so/cd7c14a65aa048df95d94218271630a2?v=7a2bd31643af49959dcb164c8583931e"
                  >
                    User Stories
                  </a>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        }
      >
        <div>
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/impressum" component={Impressum} />
        </div>
      </TagifyNavigation>
    </>
  );
}
