import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Tab, Tabs } from '@material-ui/core';

import { mapRoute } from '../../utils/Utils';
import { TagifyAppBar } from '../snippets/TagifyAppBar';
import { Title } from '../snippets/Title';

export function NavBar() {
  const routes: Array<string> = ["/login"];
  const TabBar = () => (
    <Route
      path="/"
      render={() => (
        <Tabs value={mapRoute(location.pathname, { prefix: routes })}>
          <Tab label="Login" value="/login" component={Link} to={"/login"} />
        </Tabs>
      )}
    />
  );

  return (
    <TagifyAppBar hideOnScroll={true}>
      <Title style={{ flexGrow: 1 }} />
      <TabBar />
    </TagifyAppBar>
  );
}
