import React from 'react';
import { Route } from 'react-router-dom';

import { Box, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Login } from './Login';
import { NavBar } from './NavBar';
import { Welcome } from './Welcome';
import { HashRouter,withRouter } from 'react-router-dom';

// const HeaderWithRouter = withRouter(NavBar);

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
      {/* <HashRouter>
          <HeaderWithRouter/> 
      </HashRouter> */}
      <NavBar/>
      <Container className={classes.main} maxWidth={false}>
        <Box my={8}>
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={Login} />
        </Box>
      </Container>
    </>
  );
}
