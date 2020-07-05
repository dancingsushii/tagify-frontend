import React, { useState } from 'react';

import {
    Button, Card, CardActions, CardContent, Grid, makeStyles, Typography
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { User } from '../../utils/BackendAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    paddingBottom: theme.spacing(10),
  },
  main: {
    width: "300px",
    height: "420px",
  },
  fieldName: {
    fontWeight: 400,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
  },

  btn1: {
    width: "270px",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export function Settings() {
  const [password, setPassword] = useState({ password1: "", password2: "" });
  const [nick, setNick] = useState("");

  function handleNickChange(e) {
    setNick(e.target.value);
  }
  function handlePasChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  function handlePasSubmit(e) {
    e.preventDefault();
    if (password.password1 === password.password2) {
      User.updatePassword({ password: password.password1 }).then(
        (responseCode) => {
          if (responseCode == "Ok") alert("Password changed!");
          else alert("Server returned error: " + responseCode);
        }
      );
    } else {
      alert("Passwords are different");
    }
  }

  function handleNickSubmit(e) {
    e.preventDefault();
    User.updateNick({ nickname: nick }).then((responseCode) => {
      if (responseCode == "Ok") alert("Nickname changed!");
      else alert("Server returned error: " + responseCode);
    });
  }

  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
      className={classes.root}
    >
      <Grid item>
        <Card className={classes.main} variant="outlined">
          <form onSubmit={handlePasSubmit}>
            <div>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  Change Password
                </Typography>
                <Typography className={classes.text}>
                  You should always make sure your password:
                </Typography>
                <ul className={classes.text}>
                  <li>Is longer than 8 charachters</li>
                  <li>Does not contain your username </li>
                </ul>
                <Typography className={classes.fieldName}>
                  New password
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  type="password"
                  name="password1"
                  variant="outlined"
                  onChange={handlePasChange}
                />

                <Typography
                  style={{ marginTop: "20px" }}
                  className={classes.fieldName}
                >
                  Re-enter your new password
                </Typography>
                <TextField
                  required
                  fullWidth
                  size="small"
                  type="password"
                  name="password2"
                  onChange={handlePasChange}
                  variant="outlined"
                />
              </CardContent>
            </div>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disableElevation
                className={classes.btn1}
              >
                Change your password
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.main} variant="outlined">
          <form onSubmit={handleNickSubmit}>
            <div>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  Set nickname
                </Typography>
                <Typography className={classes.text}>
                  Remember only your nickname will be publicly visible. It will
                  identify all your contributions made to Tagify. Make sure your
                  nickname:
                </Typography>
                <ul className={classes.text}>
                  <li>Is not in any way offensive</li>
                  <li>Is not misleading</li>
                  <li>Does not contain any profanity</li>
                </ul>
                <Typography style={{ marginTop: "45px", fontWeight: 400 }}>
                  Your nickname
                </Typography>
                <TextField
                  required
                  size="small"
                  fullWidth
                  name="nick"
                  onChange={handleNickChange}
                  variant="outlined"
                />
              </CardContent>
            </div>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disableElevation
                className={classes.btn1}
              >
                Set nickname
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
