import React, { Props } from 'react';
import { Link } from 'react-router-dom';

import {
    createStyles, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer,
    Theme, Typography
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import placeholder from '../../assets/Placeholder.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {},
    content: {
      paddingTop: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 200,
    },
  })
);

export const NavDrawer = (props: Props) => {
  const { anchor, state, toggle } = props;

  const classes = useStyles();

  return (
    <React.Fragment key={anchor}>
      <SwipeableDrawer
        anchor={anchor}
        open={state}
        onClose={toggle(false)}
        onOpen={toggle(true)}
      >
        <div className={classes.content}>
          <img src={placeholder} width="75" />
          <Typography
            variant="h4"
            component={Link}
            to={"/"}
            onClick={toggle(false)}
            style={{
              textDecoration: "none",
              color: "inherit",
              margin: "20px 0px 20px 0px",
            }}
          >
            Tagify
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem
            key={"home"}
            button
            component={Link}
            to={"/"}
            onClick={toggle(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            key={"Impessum"}
            button
            component={Link}
            to={"/impressum"}
            onClick={toggle(false)}
          >
            <ListItemIcon>§</ListItemIcon>
            <ListItemText primary="Impressum" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
