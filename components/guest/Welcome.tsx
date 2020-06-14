import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import background from '../../assets/background.jpg';
import { Box, Card, CardContent, FormControl, InputLabel, Input, TextField} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import {Helmet} from 'react-helmet';

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    margin: 0,
    marginTop: -85,
    height: "100vh",
    width: "100vw",
    backgroundBlendMode: "inherit",
    opacity: 1
  },
  color: {
    height: '100%',
    width: '100%',
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    justify: "center",

  },
  textContainer: {
    //display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-15%, -50%)",
    maxWidth: "sm",
    position: "absolute",
    alignSelf: "center",
    justifySelf: "center",
    justifyContent: "center",
    alignItems: 'center'
  },
  maintext: {
    align: "center",
    alignContent: "center",
  },
  card: {
    width: "400px",
    height: "400px",
  },
  cardContent: {
    alignContent: "center",
    justifyContent: "center",
    flex: '1 0 auto',
  },
  cardText: {
    textAlign: "center",
  },
  paper: {
    textAlign: 'center',
  },
  formControl: {
    width: 350,
  },
  textfield: {
    width: 350,
    height: 100,
  },
});

export const Welcome = () => {
  const classes = useStyles();

  return (

  <Box className={classes.root}>
    <Helmet>
      <style>{'body { background-color: #e7dabe;  }'}</style>
    </Helmet>
        <Grid container 
          direction="column"
          spacing={3}
          alignItems="center"
          justify="center"
          style={{ minHeight: '80vh' }}>
          <Grid item xs={6} >
            <Typography className={classes.maintext} variant="h1">
                Tagify
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.maintext} variant="h6">
                  Labeling is easy!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Tab label="More information"/>
          </Grid>
        </Grid>
        <Grid container
          direction="column"
          spacing={2}
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardText} variant="h4">
                    Contact Us
                </Typography>
                  <Grid item xs={12} sm={6}>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
  </Box>

  );
};
