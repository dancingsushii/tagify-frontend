import React from 'react';
import welcome from '../../assets/welcome.jpg';
import taggedPicture from '../../assets/taggedPicture.png';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import placeholder from '../../assets/Placeholder.svg';
import { TextField, FormControl, Input, InputLabel, Toolbar, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    elevation: 0,
    maxWidth: '100%',
    height: 1620,
  },
  image: {
    width: 600,
    height: 400,
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  typography: {
    align: "center",
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  textfield: {
    width: 300,
    height: 100,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  footer: {
    minHeight: 128,
    background: "#9FC4BF",
    color: "black"
  }
}));

export const Welcome = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography className={classes.typography} variant="h1">
                  <img src={placeholder} width="75" />
                  Tagify
                </Typography>
                <Box p={2} bgcolor="background.paper"></Box>
                <Typography className={classes.typography} variant="body1" align="justify">
                  Labeling makes life simplier!
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid className={classes.image}>
              <img className={classes.img} src={welcome} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={taggedPicture} width="1200" height="700" />
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '20vh' }}>
          <Typography className={classes.typography} variant="h2">
            Contact Us
          </Typography>
          <Grid item xs={12} sm={6} >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="my-input">First Name</InputLabel>
              <Input id="my-name" aria-describedby="my-helper-text" />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="my-input">Last Name</InputLabel>
              <Input id="my-surname" aria-describedby="my-helper-text" />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="my-input">Email Address</InputLabel>
              <Input id="my-email" aria-describedby="my-helper-text"/>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textfield}
              id="outlined-textarea"
              placeholder="Message"
              multiline
              rows={7}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid           
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '17vh' }}>
          <Button variant="outlined">Submit</Button>
        </Grid>
      </Paper>
      <Toolbar className={classes.footer}>
          <Typography variant="h5" noWrap>
            <img src={placeholder} width="75" />
            Tagify
          </Typography>
      </Toolbar>
    </div>
  );
};
