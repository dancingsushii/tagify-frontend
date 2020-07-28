import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid,
    makeStyles, Typography
} from '@material-ui/core';

import { Albums, Status } from '../../utils/BackendAPI';
import { DashboardSkeleton } from '../snippets/DashboardSkeleton';
import TagifyAlertDialog from '../snippets/TagifyAlertDialog';
export const DashBoard = (props: { search: any; value: any }) => {
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
  /* AlertBox controll */
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescrpition, setAlertDescrpition] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfirmTxt, setAlertConfirmTxt] = useState("");

  /* ////////////////////// */

  type Album = {
    id: number;
    title: string;
    description: string;
    first_photo: number;
  };
  const [isLoaded, setLoaded] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumsBackup, setAlbumsBackup] = useState<Album[]>([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current && props.value !== "") {
      Albums.searchAlbums(props.value).then((response) => {
        if (response.status == "Ok") {
          setAlbums(response.data.albums);
        } else alert("Server returned error: " + response.status);
      });
    } else if (props.value == "" && albumsBackup.length) {
      setAlbums(albumsBackup);
    } else didMountRef.current = true;
  }, [props.search]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await Albums.getAllAlbums();
      if (response.status === Status.Ok) {
        if (response.data.albums !== undefined) {
          setAlbums(response.data.albums);
          setLoaded(true);
          setAlbumsBackup(response.data.albums);
        }
      } else {
        setAlertConfirmTxt("ok");
        setAlertDescrpition("Failed to load albums");
        setAlertOpen(true);
        // alert("Failed to load album");
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
                          image={(() => {
                            if (album.first_photo == null) {
                              return `https://generative-placeholders.glitch.me/image?width=300&height=300&img=${album.id}`;
                            }
                            return `/api/user/albums/${album.id}/photos/${album.first_photo}`;
                          })()}
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
        </Container>
      </>
    );
  } else if (isLoaded) {
    // No albums ---> display link to create new album
    return (
      <Container style={{ textAlign: "center", marginTop: "6em" }}>
        <Typography variant="h2">Oops</Typography>
        <Box component="div" style={{ marginTop: "1em" }}>
          It looks like we couldn't find your album or we don't have any albums
          at all :(
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
    return <div></div>;
  }
};
