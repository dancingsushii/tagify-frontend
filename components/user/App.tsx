import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';

import { Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';

import Token from '../../utils/BackendAPI';
import { Impressum } from '../Impressum';
import { TagifyNavigation } from '../snippets/TagifyNavigation';
import { DashBoard } from './DashBoard';
import { Settings } from './Settings';

export function App() {
  return (
    <Route
      render={() => {
        return Token.isAuthenticated() ? (
          <TagifyNavigation
            drawer={
              <div>
                <Divider />
                {/* here comes the drawer content */}
                <List>
                  <ListItem
                    button
                    key={"Dashboard"}
                    component={Link}
                    to={"/dashboard"}
                  >
                    <ListItemIcon children={<HomeIcon />} />
                    <ListItemText primary={"Dashboard"} />
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem button key={"Contact"}>
                    <ListItemIcon children={<ContactSupportIcon />} />
                    <ListItemText primary={"Contact"} />
                  </ListItem>
                  <ListItem
                    button
                    key={"Impressum"}
                    component={Link}
                    to={"/impressum"}
                  >
                    <ListItemIcon children={<NotesIcon />} />
                    <ListItemText primary={"Impressum"} />
                  </ListItem>
                </List>
              </div>
            }
            appbar={
              <div>
                <Route exact path="/">
                  <Button>Hallo</Button>
                </Route>
              </div>
            }
          >
            <div>
              <Route path="/dashboard" component={DashBoard} />
              <Route path="/impressum" component={Impressum} />
              <Route path="/settings" component={Settings} />
            </div>
          </TagifyNavigation>
        ) : (
          <Redirect to={{ pathname: "/welcome" }} />
        );
      }}
    />
  );
}
