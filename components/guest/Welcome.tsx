import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import {
    Box, Button, Card, CardContent, FormControl, FormControlLabel, IconButton, Input, InputLabel,
    TextField
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import background from '../../assets/background.jpg';
import logo from '../../assets/tagify_icon.svg';

const useStyles = makeStyles({
  // css for first sector with image
  imageGrid: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no repeat",
  },
  contactGrid: {
    margin: 0,
  },
  maintext: {
    align: "center",
    alignContent: "center",
    margin: 5,
  },
  card: {
    height: "420px",
    width: "400px",
  },
  cardContent: {
    alignContent: "center",
    justifyContent: "center",
  },
  cardText: {
    textAlign: "center",
  },
  formControl: {
    width: "90%",
    marginLeft: 10,
    marginRight: "5%",
    alignContent: "center",
    justifyContent: "center",
  },
  textfield: {
    height: 100,
    marginTop: 20,
    width: "93%",
    marginLeft: "2%",
    marginRight: "5%",
    alignContent: "center",
  },
  gridSubmit: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    justify: "center",
  },
  transSubmit: {
    marginTop: 20,
    color: "transparent",
    backgroundRepeat: "no-repeat",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    padding: "unset",
  },
});

export const Welcome = () => {
  const classes = useStyles();
  const handleClick = () =>
    document.getElementById("contact_container")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });

  // set up for formspree
  const [state, setState] = useState({ status: "" });
  const submitForm = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setState({ status: "SUCCESS" });
      } else {
        setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  };

  return (
    <Box>
      <Helmet>
        <style>{"body { background-color: #e7dabe;  }"}</style>
      </Helmet>
      {/* Image/Info container */}
      <Grid
        container
        className={classes.imageGrid}
        direction="column"
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", width: "100vw" }}
      >
        <Grid item xs={12}>
          <img src={logo} width="350" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Labeling is easy!</Typography>
        </Grid>
        <Grid item xs={12}>
          <Tab label="Contact us" onChange={handleClick} />
        </Grid>
      </Grid>
      {/* Contact us container */}
      <Grid
        container
        className={classes.contactGrid}
        id="contact_container"
        direction="column"
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <form
              onSubmit={submitForm}
              action="https://formspree.io/mdowyzpj"
              method="POST"
            >
              <Grid item xs={12}>
                <Typography className={classes.cardText} variant="h4">
                  Contact Us
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="my-name">Name</InputLabel>
                  <Input
                    id="my-name"
                    aria-describedby="my-helper-text"
                    type="name"
                    name="name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="my-surname">Email</InputLabel>
                  <Input
                    id="my-surname"
                    aria-describedby="my-helper-text"
                    type="email"
                    name="email"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textfield}
                  id="outlined-textarea"
                  placeholder="Message"
                  multiline
                  rows={3}
                  variant="outlined"
                  type="text"
                  name="message"
                />
              </Grid>
              <Grid container item xs={12} className={classes.gridSubmit}>
                {state.status === "SUCCESS" ? (
                  <Typography className={classes.cardText}>
                    <p>Thanks!</p>
                  </Typography>
                ) : (
                  <button className={classes.transSubmit}>
                    <Button
                      size="medium"
                      color="primary"
                      variant="contained"
                      disableElevation
                    >
                      Submit
                    </Button>
                  </button>
                )}
                {state.status === "ERROR" && (
                  <Grid item xs={12}>
                    <Typography className={classes.cardText}>
                      <p>Ooops! There was an error.</p>{" "}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};
