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
    logoutButton: {
      float: 'right',
      marginRight: 0,
      alignSelf: "right",
    },
  })
);

export function NavBar() {
  const classes = useStyles();

  return (
    <TagifyAppBar hideOnScroll={true}>
      <Typography variant="h6">Admin Page</Typography>
      <Button className={classes.logoutButton}>Logout</Button>
    </TagifyAppBar>
  );
}
