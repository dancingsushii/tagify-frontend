import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Container, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';

import { Impressum } from '../Impressum';
import { TagifyNavigation } from '../snippets/TagifyNavigation';
import { DashBoard } from './DashBoard';
import { Settings } from './Settings';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      overflow: "auto",
      flexGrow: 1,
    },
  })
);

export function App() {
  const classes = useStyles();

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
        <Container className={classes.main}>
          <Route exact path="/" component={DashBoard} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/settings" component={Settings} />
        </Container>
      </TagifyNavigation>
    </>
  );
}
