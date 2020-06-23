import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';

import { Impressum } from '../Impressum';
import { TagifyNavigation } from '../snippets/TagifyNavigation';
import { DashBoard } from './DashBoard';
import { Settings } from './Settings';

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
              {location.pathname !== "/" && (
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
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={Login} />
        </div>
      </TagifyNavigation>
    </>
  );
}
