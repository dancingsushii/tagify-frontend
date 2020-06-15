import React from 'react';
import { Route } from 'react-router-dom';

import { Box, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Albums } from './Albums';
import { NavBar } from './NavBar';
import { Users } from './Users';

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
      <NavBar />
      <Container className={classes.main}>
        <Box my={8}>
          <Route path={"/admin/users"} component={Users} />
          <Route path={"/admin/albums"} component={Albums} />
        </Box>
      </Container>
    </>
  );
}
