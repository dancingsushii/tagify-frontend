import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Box, Container, Tab, Tabs } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import logo from '../../assets/tagify_icon.svg';
import { mapRoute } from '../../utils/Utils';
import { TagifyNavigation } from '../snippets/TagifyNavigation';
import { Login } from './Login';
import { Welcome } from './Welcome';

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
        {/* <Container className={classes.main}> */}
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        {/* </Container> */}
      </TagifyNavigation>
    </>
  );
}
