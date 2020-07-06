import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';

import {
    Button, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';
import SearchIcon from '@material-ui/icons/Search';

import Token from '../../utils/BackendAPI';
import { Impressum } from '../Impressum';
import { TagifyNavigation } from '../snippets/TagifyNavigation';
import { AddAlbum } from './AddAlbum';
import { Album } from './Album';
import { DashBoard } from './DashBoard';
import EditAlbum from './EditAlbum';
import MyAlbums from './MyAlbums';
import { Settings } from './Settings';
import { UserMenu } from './UserMenu';

export function App() {
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 220,
      height: 35,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }));
  const classes = useStyles();

  return (
    <>
      {!Token.isAuthenticated() && <Redirect to={{ pathname: "/welcome" }} />}
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
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Route path="/album">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained">Back</Button>
              </Link>
            </Route>
            <Route exact path="/">
              <Paper component="form" className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Albums"
                  inputProps={{ "aria-label": "search albums" }}
                />
                <IconButton className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Route>
            <div style={{ flexGrow: 1 }} />
            <IconButton component={Link} to={"/addalbum"}>
              <AddIcon />
            </IconButton>
            <UserMenu />
          </div>
        }
      >
        <div>
          <Route exact path="/" component={DashBoard} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/settings" component={Settings} />
          <Route path="/album" component={Album} />
          <Route path="/myalbums" component={MyAlbums} />
          <Route path="/editalbum" component={EditAlbum} />
          <Route path="/addalbum" component={AddAlbum} />
        </div>
      </TagifyNavigation>
    </>
  );
}
