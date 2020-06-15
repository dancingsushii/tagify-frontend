import React from 'react';
import { Route } from 'react-router-dom';

import { Box, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { NavBar } from './NavBar';

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
    </>
  );
}
