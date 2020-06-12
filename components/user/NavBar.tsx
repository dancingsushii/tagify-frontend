import PropTypes from 'prop-types';
import React from 'react';
import { Link, Route } from 'react-router-dom';

import {
    createStyles, FormControlLabel, IconButton, makeStyles, Switch, Tab, Tabs, Theme
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

import { mapRoute } from '../../utils/Utils';
import { TagifyAppBar } from '../snippets/TagifyAppBar';

// import { Title } from '../snippets/Title';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: _theme.spacing(2),
    },
    tabBar: {
      flexGrow: 1,
    },
    tabBarItems: {},
  })
);

NavBar.propTypes = {
  toggleLeftDrawer: PropTypes.func.isRequired, // signature: (open: boolean)
  toggleRightDrawer: PropTypes.func.isRequired, // signature: (open: boolean)
};

export function NavBar({ toggleLeftDrawer, toggleRightDrawer }) {
  const classes = useStyles();

  const routes: Array<string> = ["/"];

  const MenuButton = () => (
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={toggleLeftDrawer(true)}
    >
      <MenuIcon />
    </IconButton>
  );

  const TabBar = () => (
    <Route
      path="/"
      render={() => (
        <Tabs
          value={mapRoute(location.pathname, { exact: routes })}
          className={classes.tabBar}
          centered={true}
        >
          <Tab
            icon={<HomeIcon />}
            value="/"
            component={Link}
            to={"/"}
            className={classes.tabBarItems}
          />
        </Tabs>
      )}
    />
  );

  const LoginButton = () => (
    <IconButton color="inherit" onClick={toggleRightDrawer(true)}>
      <PersonIcon />
    </IconButton>
  );

  return (
    <TagifyAppBar hideOnScroll={true}>
      <MenuButton />
      {/* <Title /> */}
      <TabBar />
      <LoginButton />
    </TagifyAppBar>
  );
}
