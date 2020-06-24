import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Box, Tab, Tabs } from '@material-ui/core';

import logo from '../../assets/tagify_icon.svg';
import { mapRoute } from '../../utils/Utils';
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
      >
        <div>
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
        </div>
      </TagifyNavigation>
    </>
  );
}
