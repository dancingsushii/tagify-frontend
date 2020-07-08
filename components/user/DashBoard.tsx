import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid,
    makeStyles, Typography
} from '@material-ui/core';

import { Albums } from '../../utils/BackendAPI';
import { DashboardSkeleton } from '../snippets/DashboardSkeleton';

// const loader = () => {
//   const [loading, setLoading] = useState(true);
//   return ({loading ? (<div><p> Loading...</p></div>) : (<Dashboard/>)}
//     );

// }
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

  type Album = {
    id: number;
    title: string;
    description: string;
    first_photo: string;
  };
  const [isLoaded, setLoaded] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await Albums.getAllAlbums();
      if (response.responseCode === "Ok") {
        if (response.albums !== undefined) {
          setAlbums(response.albums.albums);
          setLoaded(true);
        }
      } else {
        alert("Failed to load album");
      }
    };
    fetchData();
  }, []);

  const classes = useStyles();
  if (isLoaded && albums.length) {
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
                <Grid item className={classes.card} key={album.id}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <Link to={{ pathname: `/album/${album.id}` }}>
                        <CardMedia
                          className={classes.media}
                          image={album.first_photo}
                        />
                      </Link>
                    </CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ fontWeight: 400 }}
                      >
                        {album.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={{ pathname: `/album/${album.id}` }}
                        style={{ textDecoration: "none" }}
                      >
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
  } else if (isLoaded) {
    // No albums ---> display link to create new album
    return (
      <Container style={{ textAlign: "center", marginTop: "6em" }}>
        <Typography variant="h2">Oops</Typography>
        <Box component="div" style={{ marginTop: "1em" }}>
          It looks like right now there are no albums that you can contribute to
          :(
        </Box>
        <Box component="div">
          Please help us make Tagify a better platform and create a new album.
        </Box>
        <Box component="div" style={{ marginTop: "2em" }}>
          <Link to="/addalbum" style={{ textDecoration: "none" }}>
            <Button variant="contained" disableElevation>
              Create new album
            </Button>
          </Link>
        </Box>
      </Container>
    );
  } else {
    return <DashboardSkeleton></DashboardSkeleton>;
  }
};
