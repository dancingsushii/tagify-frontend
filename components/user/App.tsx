import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import {
    Button, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import SearchIcon from '@material-ui/icons/Search';

import Token from '../../utils/BackendAPI';
import { Impressum } from '../Impressum';
import Annotator from '../snippets/Annotator';
import { TagifyNavigation } from '../snippets/TagifyNavigation';
import { AddAlbum } from './AddAlbum';
import { Album } from './Album';
import Annotate from './Annotate';
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
  const [useSearch, setUseSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");

  function handleSearchSubmit(event) {
    event.preventDefault();
    setUseSearch(!useSearch);
  }

  function handleSearchBarChange(event) {
    setSearch(event.target.value);
  }
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
              <ListItem
                button
                key={"Myalbums"}
                component={Link}
                to={"/myalbums"}
              >
                <ListItemIcon children={<PhotoAlbumIcon />} />
                <ListItemText primary={"My Albums"} />
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
            <Route path="/album/:id">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained">Back</Button>
              </Link>
            </Route>
            <Route path="/editalbum/:id">
              <Link to="/myalbums" style={{ textDecoration: "none" }}>
                <Button variant="contained">Back to My Albums</Button>
              </Link>
            </Route>
            <Route exact path="/">
              <Paper
                component="form"
                className={classes.root}
                onSubmit={handleSearchSubmit}
              >
                <InputBase
                  className={classes.input}
                  placeholder="Search Albums"
                  inputProps={{ "aria-label": "search albums" }}
                  value={search}
                  onChange={handleSearchBarChange}
                />
                <IconButton
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={handleSearchSubmit}
                >
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
        <Switch>
          <Route exact path="/">
            <DashBoard search={useSearch} value={search} />
          </Route>
          <Route path="/impressum" component={Impressum} />
          <Route path="/settings" component={Settings} />
          <Route exact path="/album">
            <Redirect to="/" />
          </Route>
          <Route path="/album/:id" component={Album} />
          <Route path="/myalbums" component={MyAlbums} />
          <Route path="/editalbum/:id" component={EditAlbum} />
          <Route path="/editalbum" component={EditAlbum} />
          <Route path="/addalbum" component={AddAlbum} />
          <Route exact path="/annotate">
            <Redirect to="/" />
          </Route>
          <Route path="/annotate/:id" component={Annotate} />
          <Route path="/*" component={() => <h1>404 Not Found</h1>} />
        </Switch>
      </TagifyNavigation>
    </>
  );
}
