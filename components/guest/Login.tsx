import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';




export class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName:"",
      password:"",
      loginErrors:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log( "handle change", event);
  }


  handleSubmit(event){
    const {
      userName,
      password,
    } = this.state;

    console.log("form submit function Username =",userName,"password = ", password);
    event.preventDefault();
  }

  render(){
    return (
      <Card>
          <form onSubmit = {this.handleSubmit}>
              <TextField style = {{margin:8}}
                label="User name"
                variant="outlined"
                type="userName"
                name = "userName"
                placeholder = "User name"
                value = {this.state.userName}
                onChange= {this.handleChange}
                required/ >
              <TextField style = {{margin:8}}
                label= "Password"
                variant="outlined"
                type="password"
                name = "password"
                placeholder = "Password"
                value = {this.state.password}
                onChange= {this.handleChange}
                required/ >
              <Button style = {{margin:8}} variant="contained" color="primary" type = "submit">Login</Button>
          </form>
    </Card>
    )
  }
}
