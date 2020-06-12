import React, { Props } from 'react';

import { Button, SwipeableDrawer, TextField, Theme } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

export const UserProfileDrawer = (props: Props) => {
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
          <h5>--- DEPRECATED, WILL BE CHANGED LATER ---</h5>
          <AccountCircleIcon style={{ fontSize: 80 }} />
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              required
              id="username-input"
              label="Username"
              defaultValue=""
            />
            <TextField
              required
              id="password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button>Login</Button>
            <h5>--- DEPRECATED, WILL BE CHANGED LATER ---</h5>
          </form>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
