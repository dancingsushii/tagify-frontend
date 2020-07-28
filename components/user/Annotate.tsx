import React, { useState } from 'react';

import {
    Box, Button, Card, CardActions, CardHeader, CardMedia, Chip, Grid, LinearProgress,
    LinearProgressProps, makeStyles, Theme, Typography
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

import TagifyAlertDialog from '../snippets/TagifyAlertDialog';

export function Annotate(props) {
  const useStyles = makeStyles((theme) => ({
    // root styling for main container
    root: {
      width: "100%",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      paddingBottom: theme.spacing(10),
      justify: "center",
    },
    // text styling
    title: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      justifySelf: "center",
      textAlign: "center",
    },
    // tags grid styling
    chips: {
      display: "flex",
      justifyContent: "left",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.3),
      },
    },
    media: {
      width: "100%",
      margin: 0,
      paddingTop: "56.25%",
      height: "150px",
    },
    progressBar: {
      marginLeft: "10px",
      width: "100%",
      marginRight: "10px",
    },
    buttonsCard: {
      justifyItems: "center",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderSpacing: 5,
    },
  }));
  const classes = useStyles();

  const [index, setIndex] = useState(0);

  /* AlertBox controll */
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescrpition, setAlertDescrpition] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfirmTxt, setAlertConfirmTxt] = useState("");

  /* ////////////////////// */

  // TODO function for rendering next photo ocClick() next button
  const onClickNext = () => {
    if (index + 1 === album.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const onclickBack = () => {
    if (index - 1 === -1) {
      setIndex(album.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  // static data for page
  var { titel, image_number, tagged_number, tags } = {
    titel: "Animals",
    image_number: 20,
    tagged_number: 11,
    tags: 3,
  };

  return (
    <Grid className={classes.root}>
      {/* container for grid */}
      <Grid item container>
        {/* left empty column */}
        <Grid item sm={1}></Grid>
        {/* middle MAIN column */}
        <Grid
          item
          container
          xs={12}
          sm={10}
          md={10}
          spacing={2}
          justify="center"
          style={{ margin: 0 }}
        >
          {/*Card wrapper */}
          <Grid
            item
            container
            xs={12}
            spacing={2}
            justify="space-around"
            style={{ margin: 0 }}
          >
            {/* Backround Card */}
            <Card>
              <Grid
                item
                container
                xs={12}
                spacing={2}
                justify="space-around"
                style={{ margin: 0 }}
              >
                {/* album title section */}
                <Grid item sm={6} spacing={2}>
                  <Card>
                    <CardHeader title={titel} className={classes.title} />
                  </Card>
                </Grid>

                {/* tags section */}
                <Grid item xs={12}>
                  <Card>
                    <Typography variant={"h6"}>Tags</Typography>
                    <div className={classes.chips}>
                      {albumtags.map((c) => (
                        <Chip label={c} variant="default" color="primary" />
                      ))}
                    </div>
                  </Card>
                </Grid>

                {/* TODO progress bar section with current tagged photos in album percentage */}
                <div className={classes.progressBar}>
                  <LinearProgressWithLabel value={30} />
                </div>

                {/* TODO with mapping picture section */}

                {/* no need if mapping DONE */}
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title={album[index].titel}></CardHeader>
                    <CardMedia
                      className={classes.media}
                      image={album[index].img}
                    />
                  </Card>
                </Grid>

                {/* TODO buttons section with links*/}
                <Grid item xs={12}>
                  <Card>
                    <CardActions className={classes.buttonsCard}>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        disableElevation
                        onClick={onclickBack}
                      >
                        Back
                      </Button>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          setAlertConfirmTxt("ok");
                          setAlertDescrpition("submit tags");
                          setAlertOpen(true);
                          //  alert("submit tags");
                        }}
                      >
                        Submit
                      </Button>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        disableElevation
                        onClick={onClickNext}
                      >
                        Next
                      </Button>
                    </CardActions>

                    {/* TODO verify button with link*/}
                    <CardActions className={classes.buttonsCard}>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          setAlertConfirmTxt("ok");
                          setAlertDescrpition("VERIFY");
                          setAlertOpen(true);
                          // alert("VERIFY");
                        }}
                      >
                        Verify
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>

              {/* end of Backround Card */}
            </Card>
            {/* card Wrapper end */}
          </Grid>
          {/* end of middle Column */}
        </Grid>
        {/* progress bar  */}

        {/* right empty column */}
        <Grid item sm={1}></Grid>
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

// override existing linear progress bar with custom height
const CustomLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 25,
    },
  })
)(LinearProgress);

// progress bar
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" marginTop="10px" height="40px" mr={1}>
        <CustomLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

//static data
const albumtags = [
  "#dog",
  "#lion",
  "#dachshund",
  "#elephant",
  "#bird",
  "#vulture",
  "#roe",
];

const album = [
  {
    titel: "pic1.jpg",
    date: "12/07/2020",
    img: "https://picsum.photos/id/237/300/300",
    tags: ["#dog"],
    progres: 11,
  },
  {
    titel: "pic2.jpg",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk",
    tags: ["roe"],
    progres: 33,
  },
  {
    titel: "pic3.jpg",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/1024/1920/1280.jpg?hmac=-PIpG7j_fRwN8Qtfnsc3M8-kC3yb0XYOBfVzlPSuVII",
    tags: ["vulture"],
    progres: 66,
  },
  {
    titel: "pic4.jpg ",
    date: "10/11/2020",
    img:
      "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y",
    tags: ["dog"],
    progres: 19,
  },
  {
    titel: "pic5.jpg",
    date: "12/08/2020",
    img: "https://picsum.photos/id/1074/5472/3648",
    tags: ["lion"],
    progres: 22,
  },
  {
    titel: "bird88.jpg",
    date: "29/07/2020",
    img:
      "https://i.picsum.photos/id/244/4288/2848.jpg?hmac=R6j9PBP4aBk2vcEIoOPU4R_nuknizryn2Vq8GGtWTrM",
    tags: ["bird"],
    progres: 66,
  },
  {
    titel: "pic7.jpg ",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y",
    tags: ["animal"],
    progres: 19,
  },
  {
    titel: "pic8jpg",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/130/3807/2538.jpg?hmac=Kl_ZLgNPUBhsKnffomgQvxWA17JhdNLYBnwlPHBEias",
    tags: ["bird"],
    progres: 22,
  },
  {
    titel: "cow2.jpg",
    date: "12/01/2020",
    img:
      "https://i.picsum.photos/id/200/1920/1280.jpg?hmac=-eKjMC8-UrbLMpy1A4OWrK0feVPB3Ka5KNOGibQzpRU",
    tags: ["cow"],
    progres: 66,
  },
  {
    titel: "tiger1.jpg ",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/219/5184/3456.jpg?hmac=2LU7i3c6fykd_J0T6rZm1aBoBmK4ivkH1Oc459aRUU0",
    tags: ["tiger"],
    progres: 19,
  },

  {
    titel: "pic11.jpg ",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/169/2500/1662.jpg?hmac=3DBeyQbiPxO88hBdhIuFPbvy2ff7cm9vmnq8lPIL9Ug",
    tags: ["#dog", "#dachshund"],
    progres: 11,
  },

  {
    titel: "pic4.jpg",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/1024/1920/1280.jpg?hmac=-PIpG7j_fRwN8Qtfnsc3M8-kC3yb0XYOBfVzlPSuVII",
    tags: [],
    progres: 66,
  },
];
