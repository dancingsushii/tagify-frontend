import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { Box, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Impressum } from '../Impressum';
import { DashBoard } from './DashBoard';
import { NavBar } from './NavBar';
import { NavDrawer } from './NavDrawer';
import { Settings } from './Settings';
import { UserProfileDrawer } from './UserProfileDrawer';

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

export type Anchor = "left" | "right";

export function App() {
  const classes = useStyles();

  const [drawerState, setDrawerState] = useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <>
      <NavDrawer
        anchor={"left" as Anchor}
        state={drawerState["left" as Anchor]}
        toggle={toggleDrawer.bind(null, "left" as Anchor)}
      />
      <UserProfileDrawer
        anchor={"right" as Anchor}
        state={drawerState["right" as Anchor]}
        toggle={toggleDrawer.bind(null, "right" as Anchor)}
      />

      <NavBar
        toggleLeftDrawer={toggleDrawer.bind(null, "left" as Anchor)}
        toggleRightDrawer={toggleDrawer.bind(null, "right" as Anchor)}
      />
      <Container className={classes.main}>
        <Box my={8}>
          <Route exact path="/" component={DashBoard} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/settings" component={Settings} />
        </Box>
      </Container>
    </>
  );
}
