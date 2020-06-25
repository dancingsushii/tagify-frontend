import React from 'react';

import {
    Box, Button, Card, CardHeader, Chip, CircularProgress, Grid, makeStyles, Typography
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Pagination from '@material-ui/lab/Pagination';

import Albumthumbneil from '../snippets/Albumthumbneil';

function handleDelete() {}

function MyAlbums() {
  const makeAlbumThumbneil = (cardProps) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Albumthumbneil {...cardProps} />
      </Grid>
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      paddingBottom: theme.spacing(10),
    },
    tags: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      paddingLeft: "0",
      marginTop: theme.spacing(4),
    },
    chip: {
      marginTop: "0.2em",
      marginRight: "0.5em",
      marginBottom: "0.5em",
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
      fontWeight: 400,
    },
    chips: {
      paddingBottom: "10px",
      display: "flex",
      justifyContent: "left",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.3),
      },
    },
    button: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  console.log(mytags);

  return (
    <Grid item container justify="center" className={classes.root} spacing={0}>
      {/* Left column */}
      <Grid item xs={1} sm={1} md={1}></Grid>

      {/* Central Column */}
      <Grid item container xs={12} sm={10} md={10} spacing={2} justify="center">
        <Grid
          item
          container
          xs={12}
          spacing={2}
          justify="space-around"
          style={{ margin: 0 }}
        >
          <Card>
            {" "}
            {/* Background Card */}
            <Grid
              item
              container
              xs={12}
              spacing={2}
              justify="space-around"
              style={{ margin: 0 }}
            >
              {/* Left up Card */}
              <Grid item container sm={6}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      title={"My Albums"}
                      subheader={
                        <Grid item>
                          <Typography variant={"h6"}>
                            Last edit: 12/06/2020
                          </Typography>
                          <Typography variant={"h6"}>
                            Number of Albums: 70
                          </Typography>
                        </Grid>
                      }
                    />
                  </Card>
                </Grid>
              </Grid>

              {/* Card with Progress data */}
              <Grid item container sm={6}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      title={"Progres"}
                      action={
                        <CircularProgressWithLabel
                          style={{ float: "right" }}
                          variant="static"
                          value={(100 * 150) / 200}
                        />
                      }
                      subheader={
                        <Grid item>
                          <Typography variant={"h6"}>
                            Total Images : {2000}
                          </Typography>
                          <Typography variant={"h6"}>
                            Total Labeled: {1500}
                          </Typography>
                        </Grid>
                      }
                    />
                  </Card>
                </Grid>
              </Grid>

              {/* card with tags */}
              <Grid item xs={12}>
                <Card style={{ padding: "5px" }}>
                  <Typography style={{ padding: "10px" }} variant={"h6"}>
                    My Tags
                  </Typography>

                  <div className={classes.chips}>
                    {mytags.map((c) => (
                      <Chip
                        label={c}
                        variant="default"
                        color="default"
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </Card>
              </Grid>
            </Grid>
            <Pagination style={{ float: "left" }} count={5} color="primary" />
            <Button
              className={classes.button}
              style={{ float: "right", margin: "5px" }}
              variant="contained"
              color="primary"
            >
              Add new Album
            </Button>
          </Card>
        </Grid>{" "}
        {/* end of upper part */}
        {AlbumList.map((c) => makeAlbumThumbneil(c))}
      </Grid>

      <Grid item xs={1} sm={1} md={1}></Grid>
      <Pagination
        style={{ float: "center", marginTop: "20px" }}
        count={5}
        color="primary"
      />
    </Grid>
  );
}

//progres circel
function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

//Data for the static example
const mytags = [
  "#dogs",
  "#labrador",
  "#Three",
  "#woods",
  "#Bicycle",
  "#mercedes",
  "#bmv",
  "#opel",
  "#monocycle",
  "Oranges",
  "#Apple",
  "#lenovo",
  "#Hills",
  "#sneakers",
  "#Rolex",
  "#sixo",
  "#berd",
  "#circle",
  "#ball",
  "#dog",
  "#lion",
  "#dachshund",
  "#elephant",
  "#bird",
  "#vulture",
  "#roe",
];
const AlbumList = [
  {
    titel: "Animals   ",
    date: "12/07/2020",
    img: "https://picsum.photos/id/237/300/300",
    tags: ["#Dog", "#dogs", "#labrador"],
    progres: 92,
  },
  {
    titel: "Nature",
    date: "12/07/2020",
    img: "https://picsum.photos/id/33/300/300",
    tags: ["#Three", "#woods"],
    progres: 33,
  },
  {
    titel: "Oranges",
    date: "12/07/2020",
    img:
      "https://vignette.wikia.nocookie.net/testo/images/f/fa/Pomara%C5%84cza.png/revision/latest?cb=20190305224547&path-prefix=pl",
    tags: ["#orange", "#oranges"],
    progres: 66,
  },
  {
    titel: "Laptops ",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU",
    tags: ["#Apple", "#lenovo"],
    progres: 19,
  },
  {
    titel: "Shoes",
    date: "12/07/2020",
    img: "https://picsum.photos/id/21/300/300",
    tags: ["#Hills", "#sneakers"],
    progres: 22,
  },
  {
    titel: "Watches",
    date: "12/07/2020",
    img: "https://i.ytimg.com/vi/ydXgwo_nvuk/maxresdefault.jpg",
    tags: ["#Rolex", "#sixo", "#berd"],
    progres: 11,
  },
  {
    titel: "Architectrure",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/1048/5616/3744.jpg?hmac=N5TZKe4gtmf4hU8xRs-zbS4diYiO009Jni7n50609zk",
    tags: ["#circle", "#ball", "#berd"],
    progres: 19,
  },

  {
    titel: "People",
    date: "12/07/2020",
    img:
      "https://static.polityka.pl/_resource/res/path/57/ff/57ff8ee9-b145-45e3-bd37-3bb9cf91d23c_f1400x900",
    tags: ["#man", "#woman"],
    progres: 33,
  },
  {
    titel: "Ships",
    date: "12/07/2020",
    img: "https://picsum.photos/id/211/300/300",
    tags: ["#circle", "#ball", "#berd"],
    progres: 66,
  },
  {
    titel: "Instruments ",
    date: "12/09/2020",
    img:
      "https://i.picsum.photos/id/1082/5416/3611.jpg?hmac=GrASx5oGYbTwT4xyJDYkurgXFFfgj37WHvaJNe8Sr1E",
    tags: ["#circle", "#ball", "#berd"],
    progres: 19,
  },
  {
    titel: "Bicycle",
    date: "01/11/2020",
    img: "https://picsum.photos/id/1077/3000/1995",
    tags: ["#Bicycle", "#monocycle"],
    progres: 22,
  },
  {
    titel: "Architectrure",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/1048/5616/3744.jpg?hmac=N5TZKe4gtmf4hU8xRs-zbS4diYiO009Jni7n50609zk",
    tags: ["#block", "#Road"],
    progres: 19,
  },
  {
    titel: "Dogs ",
    date: "12/07/2020",
    img:
      "https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k",
    tags: ["#jork", "#terier"],
    progres: 11,
  },
  {
    titel: "Nature",
    date: "12/07/2020",
    img: "https://picsum.photos/id/33/300/300",
    tags: ["#circle", "#ball", "#berd"],
    progres: 33,
  },
  {
    titel: "Cars ",
    date: "22/07/2020",
    img:
      "https://i.picsum.photos/id/1071/3000/1996.jpg?hmac=rPo94Qr1Ffb657k6R7c9Zmfgs4wc4c1mNFz7ND23KnQ",
    tags: ["#mercedes", "#bmv", "#opel"],
    progres: 19,
  },
  {
    titel: "Je",
    date: "12/07/2020",
    img: "https://picsum.photos/id/21/300/300",
    tags: ["#circle", "#ball", "#berd"],
    progres: 22,
  },
];
export default MyAlbums;
