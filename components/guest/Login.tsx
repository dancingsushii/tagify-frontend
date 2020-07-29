import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import {
    createStyles, Grid, IconButton, InputAdornment, makeStyles, Theme
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import background from '../../assets/background.jpg';
import BackendToken, { Default, Status, UserRole } from '../../utils/BackendAPI';
import TagifyAlertDialog from '../snippets/TagifyAlertDialog';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",
      padding: 5,
      marginTop: 10,
    },
    adornedEnd: {
      paddingRight: 0,
    },
    imageGrid: {
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no repeat",
    },
  })
);

enum LoginForm {
  username = "username",
  password = "progress",
}

export function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  /*////// AlertBox controll////// */
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescrpition, setAlertDescrpition] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfirmTxt, setAlertConfirmTxt] = useState("");
  /* ////////////////////////////// */

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const field = target.name;
    const value = target.value;

    switch (field) {
      case LoginForm.username:
        setUsername(value);
        break;
      case LoginForm.password:
        setPassword(value);
        break;
      default:
        console.error("Default handler reached!");
    }
  }

  const handleSubmit = (event) => {
    Default.login({
      username: username,
      password: password,
    }).then((response) => {
      if (response.status === Status.Ok) {
        BackendToken.login();
        BackendToken.userRole =
          response.data?.role == "user"
            ? UserRole.User
            : response.data?.role == "admin"
            ? UserRole.Admin
            : undefined;
        BackendToken.nickname =
          response.data == undefined ? "" : response.data.nickname;
        if (BackendToken.userRole == UserRole.Admin) {
          window.location.replace("/admin");
        } else if (BackendToken.userRole == UserRole.User) {
          props.history.push("/");
        } else {
          setAlertConfirmTxt("ok");
          setAlertDescrpition("Oops, broken");
          setAlertOpen(true);
          // alert("Oops, broken");
          console.error(
            "Reached unexpected case: Server returned 200, but role is undefined"
          );
        }
      } else {
        setAlertConfirmTxt("ok");
        setAlertDescrpition("Failed to login");
        setAlertOpen(true);
        //alert("Failed to login");
      }
    });
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      className={classes.imageGrid}
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Container component="main" maxWidth="xs" style={{}}>
        <Helmet>
          <style>{"body { background-color: #e7dabe;  }"}</style>
        </Helmet>
        <Card style={{ marginTop: 200, width: "100%", paddingTop: 0 }}>
          <form
            onSubmit={handleSubmit}
            style={{ margin: 8, alignItems: "stretch" }}
          >
            <TextField
              className={classes.textField}
              label="User name"
              variant="outlined"
              type="text"
              name={LoginForm.username}
              placeholder="User name"
              value={username}
              onChange={handleChangeInput}
              required
            />
            <TextField
              className={classes.textField}
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              name={LoginForm.password}
              placeholder="Password"
              value={password}
              onChange={handleChangeInput}
              required
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

            <Button
              className={classes.textField}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Card>
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
      </Container>
    </Grid>
  );
}
