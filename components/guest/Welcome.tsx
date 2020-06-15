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
    margin: 0,
    marginTop: -85,
    minHeight: "100vh",
    minWidth: "100vw",
    opacity: 1
  },
  // css for first sector with image
  imageGrid: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no repeat",
    margin: 0
  },
  maintext: {
    align: "center",
    alignContent: "center",
  },
  card: {
    height: "420px",
    width: "400px"
  },
  cardContent: {
    alignContent: "center",
    justifyContent: "center",
    // flex: '1 0 auto',
  },
  cardText: {
    textAlign: "center",
  },
  formControl: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    alignContent: "center",
    marginTop: 5
  },
  textfield: {
    height: 100,
    marginTop: 20,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    alignContent: "center",
  },
});

export const Welcome = () => {
  const classes = useStyles();

  return (

  <Box className={classes.root}>
    <Helmet>
      {/* was #e7dabe */}
      <style>{'body { background-color: red;  }'}</style> 
    </Helmet>
        {/* Image/Info container */}
        <Grid container 
          className={classes.imageGrid}
          direction="column"
          spacing={3}
          alignItems="center"
          justify="center" 
          style={{ minHeight: '100vh', minWidth: '100vw' }}> 
          <Grid item xs={12} >
            <Typography className={classes.maintext} variant="h1">
                Tagify
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.maintext} variant="h6">
                  Labeling is easy!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Tab label="Contact us"/>
          </Grid>
        </Grid>
        {/* Contact us container */}
        <Grid container
          direction="column"
          spacing={5}
          alignItems="center"
          justify="center"
          // was 100vh
          style={{ minHeight: '120vh' }}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                {/* <FormControl>
                    <Typography className={classes.cardText} variant="h4">
                          Contact Us
                    </Typography>
                    <InputLabel htmlFor="my-name" >First Name</InputLabel>
                    <Input id="my-name" aria-describedby="my-helper-text" className={classes.formControl}/>
                    <InputLabel htmlFor="my-surname">Last Name</InputLabel>
                    <Input id="my-surname" aria-describedby="my-helper-text" className={classes.formControl}/>
                    <InputLabel htmlFor="my-email">Email Address</InputLabel>
                    <Input id="my-email" aria-describedby="my-helper-text" className={classes.formControl}/>
                    <TextField
                      className={classes.textfield}
                      id="outlined-textarea"
                      placeholder="Message"
                      multiline
                      rows={7}
                      variant="outlined"
                    />
                </FormControl> */}
                  <Grid item xs={12}>
                    <Typography className={classes.cardText} variant="h4">
                        Contact Us
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="my-name">First Name</InputLabel>
                      <Input id="my-name" aria-describedby="my-helper-text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="my-surname">Last Name</InputLabel>
                      <Input id="my-surname" aria-describedby="my-helper-text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="my-email">Email Address</InputLabel>
                      <Input id="my-email" aria-describedby="my-helper-text"/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
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
  </Box>

  );
};
