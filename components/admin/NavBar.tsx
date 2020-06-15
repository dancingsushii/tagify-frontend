import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Button, createStyles, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';

import { mapRoute } from '../../utils/Utils';
import { TagifyAppBar } from '../snippets/TagifyAppBar';
import { Title } from '../snippets/Title';

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

export function NavBar() {
  const classes = useStyles();

  const routes: Array<string> = ["/admin/users", "/admin/albums"];

  const TabBar = () => (
    <Route
      path="/admin"
      render={() => (
        <Tabs
          value={mapRoute(location.pathname, { prefix: routes })}
          className={classes.tabBar}
          centered={true}
        >
          <Tab
            label="Users"
            value="/admin/users"
            component={Link}
            to={"/admin/users"}
          />
          <Tab
            label="Albums"
            value="/admin/albums"
            component={Link}
            to={"/admin/albums"}
          />
        </Tabs>
      )}
    />
  );

  return (
    <TagifyAppBar hideOnScroll={true}>
      <Typography variant="h6">Admin Page</Typography>
      <TabBar />
      <Button>Logout</Button>
    </TagifyAppBar>
  );
}
