import React from 'react';

import {
    Box, Button, Card, CardContent, CardHeader, Chip, CircularProgress, Grid, makeStyles, Typography
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';

import PictureEditCard from '../snippets/PictureThumbneil';

function EditAlbum(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
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
    chips: {
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

  const handleDelete = () => {};

  const makePictureCard = (cardProps) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {" "}
        <PictureEditCard {...cardProps} />{" "}
      </Grid>
    );
  };

  var { titel, description, image_number, tagged_number, tags } = {
    titel: "Animals",
    description:
      " The definition of an animal is a member of the kingdom Animalia, and is typically characterized by a multicellular body, specialized sense organs, voluntary movement, responses to factors in the environment and the ability to acquire and digest food.",
    image_number: 20,
    tagged_number: 11,
    tags: 3,
  };

  return (
    <Grid className={classes.root} justify="center">
      <Grid item container>
        {/* Left columnt */}
        <Grid item sm={1}></Grid>

        {/* Middle column */}
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
                {/* Album Titel Card */}
                <Grid item sm={6} spacing={2}>
                  <Card>
                    <CardHeader
                      action={
                        <Button>
                          <EditIcon />{" "}
                        </Button>
                      }
                      title={titel}
                      subheader={"Created:12/07/2020"}
                    />

                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Column with Progres and tags */}
                <Grid item container sm={6} spacing={1}>
                  {/* Progres Card */}
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title={"Progres"}
                        action={
                          <CircularProgressWithLabel
                            style={{ float: "right" }}
                            variant="static"
                            value={(100 * (album.length - 1)) / album.length}
                          />
                        }
                        subheader={
                          <Grid item>
                            <Typography variant={"h6"}>
                              Images Number: {album.length}
                            </Typography>
                            <Typography variant={"h6"}>
                              Images Labeled: {album.length - 1}
                            </Typography>
                          </Grid>
                        }
                      />
                    </Card>
                  </Grid>

                  {/* Card with Tags */}
                  <Grid item xs={12}>
                    <Card>
                      <Typography variant={"h6"}>Tags</Typography>
                      <div className={classes.chips}>
                        {albumtags.map((c) => (
                          <Chip
                            label={c}
                            variant="default"
                            color="primary"
                            onDelete={handleDelete}
                          />
                        ))}
                      </div>
                    </Card>
                  </Grid>
                </Grid>

                {/* Pagination and add  Pic button */}
                <Grid item xs={12}>
                  <Pagination
                    style={{ float: "left", marginTop: "10px" }}
                    count={1}
                    color="secondary"
                  />
                  <Button
                    style={{ float: "right", margin: "5px" }}
                    variant="contained"
                    color="secondary"
                  >
                    Add Pictures
                  </Button>
                </Grid>
              </Grid>
              {/* End of Backround Card */}
            </Card>

            {/* Card Wrapper end */}
          </Grid>

          {/* Picture Thumbneils */}
          {album.map((c) => makePictureCard(c))}
          <Grid item xs={12} justify="center">
            <Pagination
              style={{ marginTop: "20px" }}
              count={1}
              color="primary"
            />
          </Grid>
          {/* End of midle Column */}
        </Grid>

        {/* Right Column */}
        <Grid item xs={0} sm={1}></Grid>
      </Grid>
    </Grid>
  );
}
// Progress circel
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
export default EditAlbum;
