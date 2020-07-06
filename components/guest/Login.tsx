import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import Token, { Default } from '../../utils/BackendAPI';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",
      padding: 5,
      marginTop: 10,
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
    }).then((responseCode) => {
      if (responseCode === "Ok") {
        Token.login();
        props.history.push("/");
      } else {
        alert("Failed to login");
      }
    });
    event.preventDefault();
  };

  return (
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
            type="password"
            name={LoginForm.password}
            placeholder="Password"
            value={password}
            onChange={handleChangeInput}
            required
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
    </Container>
  );
}
