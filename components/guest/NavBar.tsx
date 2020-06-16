import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Tab, Tabs } from '@material-ui/core';

import logo from '../../assets/tagify_icon.svg';
import { mapRoute } from '../../utils/Utils';
import { TagifyAppBar } from '../snippets/TagifyAppBar';

export function NavBar() {
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
    <TagifyAppBar hideOnScroll={true} transparent={true}>
      {location.pathname !== "/" && (
        <Link to="/">
          <img src={logo} width="150" />
        </Link>
      )}
      <div style={{ flexGrow: 1 }} />
      <TabBar />
    </TagifyAppBar>
  );
}
