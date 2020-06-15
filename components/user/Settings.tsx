import React, { useState } from 'react';

import {
    Box, Button, Card, CardActions, CardContent, Grid, makeStyles, Typography
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  main: {
    width: "300px",
    height: "400px",
  },
  heading: {
    marginTop: theme.spacing(1),
  },
  form: {
    background: "#f2f2f2",
    borderTop: "2px solid #2196f3",
    marginTop: theme.spacing(10),
    borderRadius: "px",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 13,
    color: "rgba(0,0,0,.6)",
  },
  input: {
    height: "10px",
  },
  btn1: {
    width: "280px",
    marginTop: "10px",
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
      alert("Passwords match");
    } else {
      alert("Passwords are different");
    }
  }
  function handleNickSubmit(e) {
    e.preventDefault();
    alert("Nick change");
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
                <Typography>New password</Typography>
                <TextField
                  margin="dense"
                  className={classes.input}
                  required
                  id="filled-required"
                  type="password"
                  name="password1"
                  variant="outlined"
                  onChange={handlePasChange}
                />

                <Typography style={{ marginTop: "40px" }}>
                  Re-enter your new password
                </Typography>
                <TextField
                  margin="dense"
                  className={classes.input}
                  required
                  type="password"
                  name="password2"
                  onChange={handlePasChange}
                  id="filled-required"
                  variant="outlined"
                />
              </CardContent>
            </div>
            <CardActions>
              <Box display="block">
                <Button
                  color="primary"
                  variant="outlined"
                  type="submit"
                  className={classes.btn1}
                >
                  Change your password
                </Button>
              </Box>
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
                <Typography style={{ marginTop: "42px" }}>
                  Your nickname
                </Typography>
                <TextField
                  margin="dense"
                  className={classes.input}
                  required
                  name="nick"
                  onChange={handleNickChange}
                  variant="outlined"
                />
              </CardContent>
            </div>
            <CardActions>
              <Button
                color="primary"
                variant="outlined"
                type="submit"
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
