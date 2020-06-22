import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const DashBoard = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    media: { width: 230, height: 140 },
    card: {
      maxWidth: 345,
    },
    filler: {
      width: 254,
      height: 0,
    },
  }));

  const [albums, SetAlbums] = useState([
    {
      album_id: 1,
      album_name: "Cats",
      first_photo: "https://placekitten.com/g/200/300",
    },
    {
      album_id: 2,
      album_name: "Dogs",
      first_photo:
        "https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191103202017556_COVER.jpg",
    },
    {
      album_id: 3,
      album_name: "Zebras",
      first_photo:
        "https://loremflickr.com/cache/resized/65535_49700189643_5e5000b9fa_320_240_nofilter.jpg",
    },
    {
      album_id: 4,
      album_name: "Faces",
      first_photo:
        "https://loremflickr.com/cache/resized/65535_49501755806_3b102c5ded_n_320_240_nofilter.jpg",
    },
    {
      album_id: 5,
      album_name: "Cars",
      first_photo: "https://jooinn.com/images/vehicles-on-road-1.png",
    },
  ]);

  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
          style={{ marginTop: "3em" }}
        >
          {albums.map((album) => {
            return (
              <Grid item className={classes.card} key={album.album_id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={album.first_photo}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: 400 }}
                      >
                        {album.album_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/album" style={{ textDecoration: "none" }}>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        disableElevation
                      >
                        Show album
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
        </Grid>
      </Container>
    </>
  );
};
