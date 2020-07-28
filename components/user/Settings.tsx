import React, { useState } from 'react';

import {
    Button, Card, CardActions, CardContent, Grid, makeStyles, Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import BackendToken, { Status, User } from '../../utils/BackendAPI';
import TagifyAlertDialog from '../snippets/TagifyAlertDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    paddingBottom: theme.spacing(10),
  },
  main: {
    width: "300px",
  },
  fieldName: {
    fontWeight: 400,
    marginTop: "1em",
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
  },

  btn1: {
    width: "270px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  adornedEnd: {
    paddingRight: 0,
  },
}));

export function Settings() {
  const [password, setPassword] = useState({ password1: "", password2: "" });
  const [nick, setNick] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleNickChange(e) {
    setNick(e.target.value);
  }
  function handlePasChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }
  /*////// AlertBox controll////// */
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescrpition, setAlertDescrpition] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfirmTxt, setAlertConfirmTxt] = useState("");
  /* ////////////////////////////// */

  function handlePasSubmit(e) {
    e.preventDefault();
    if (password.password1 === password.password2) {
      User.updatePassword({ password: password.password1 }).then((response) => {
        if (response.status == Status.Ok) {
          setPassword({ password1: "", password2: "" });
          setAlertDescrpition("Password changed!");
          //alert("Password changed!");
        } else setAlertDescrpition("Server returned error: " + response.status);
        //alert("Server returned error: " + response.status);
        setAlertConfirmTxt("ok");
        setAlertOpen(true);
      });
    } else {
      setAlertConfirmTxt("ok");
      setAlertDescrpition("Passwords don't match");
      setAlertOpen(true);
      //alert("Passwords don't match");
    }
  }

  function handleNickSubmit(e) {
    e.preventDefault();
    User.updateNick({ nickname: nick }).then((response) => {
      if (response.status == Status.Ok) {
        BackendToken.nickname = nick;
        setNick("");
        setAlertDescrpition("Nickname changed!");
        //alert("Nickname changed!");
      } else {
        setAlertDescrpition("Server returned error: " + response.status);
        //alert("Server returned error: " + response.status);
      }
      setAlertConfirmTxt("ok");
      setAlertOpen(true);
    });
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                type={showPassword ? "text" : "password"}
                name="password1"
                value={password.password1}
                variant="outlined"
                onChange={handlePasChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    adornedEnd: classes.adornedEnd,
                  },
                }}
              />

              <Typography gutterBottom>Re-enter your new password</Typography>
              <TextField
                required
                fullWidth
                size="small"
                type={showPassword ? "text" : "password"}
                name="password2"
                value={password.password2}
                onChange={handlePasChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    adornedEnd: classes.adornedEnd,
                  },
                }}
              />
            </CardContent>
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
              <Typography style={{ marginTop: "2em", fontWeight: 400 }}>
                Your nickname
              </Typography>
              <TextField
                required
                size="small"
                fullWidth
                name="nick"
                value={nick}
                onChange={handleNickChange}
                variant="outlined"
              />
            </CardContent>
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
      <TagifyAlertDialog
        Title={alertTitle}
        Descrpition={alertDescrpition}
        isOpen={alertOpen}
        ConfirmTxt={alertConfirmTxt}
        CancelTxt={""}
        handleClose={() => setAlertOpen(false)}
        handleConfirm={() => setAlertOpen(false)}
        handleCancel={() => setAlertOpen(false)}
      />
    </Grid>
  );
}
