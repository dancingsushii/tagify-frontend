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
  return (
    <>
      <TagifyNavigation
        drawer={
          <div>
            <Divider />
            {/* here comes the drawer content */}
            <List>
              <ListItem button key={"Dashboard"} component={Link} to={"/"}>
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
        appbar={<div>TagifyAppbar</div>}
      >
        <div>
          <Route exact path="/" component={DashBoard} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/settings" component={Settings} />
        </div>
      </TagifyNavigation>
    </>
  );
}
