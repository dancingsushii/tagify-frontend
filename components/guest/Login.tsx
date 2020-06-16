import React from 'react';
import { Helmet } from 'react-helmet';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      loginErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log("handle change", event);
  }

  handleSubmit(event) {
    const { userName, password } = this.state;

    console.log(
      "form submit function Username =",
      userName,
      "password = ",
      password
    );
    event.preventDefault();
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Helmet>
          <style>{"body { background-color: #e7dabe;  }"}</style>
        </Helmet>
        <Card style={{ marginTop: 50, width: "100%", paddingTop: 0 }}>
          <form
            onSubmit={this.handleSubmit}
            style={{ margin: 8, alignItems: "stretch" }}
          >
            <TextField
              style={{ width: "100%", padding: 5, marginTop: 10 }}
              label="User name"
              variant="outlined"
              type="userName"
              name="userName"
              placeholder="User name"
              value={this.state.userName}
              onChange={this.handleChange}
              required
            />
            <TextField
              style={{ width: "100%", padding: 5, marginTop: 10 }}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <Button
              style={{ width: "100%", marginTop: 10, padding: 10 }}
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
}
