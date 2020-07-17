import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, makeStyles, Paper
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';

import { Albums, PhotoInformation, Status } from '../../utils/BackendAPI';
import { AlbumSkeleton } from '../snippets/AlbumSkeleton';
import PictureDialog from '../snippets/PictureDialog';

export function Album(props) {
  let id = props.match.params.id;
  const [album, setAlbum] = useState({
    id: 1,
    title: "",
    description: "",
    tags: [""],
    image_number: 0,
    tagged_number: 0,
    users_id: 0,
    first_photo: "",
  });
  const [pictures, setPictures] = useState<Array<PhotoInformation>>([]);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Albums.getAlbum(id);
        if (response.status === Status.Ok && response.data !== undefined) {
          setAlbum(response.data);
          let response2 = await Albums.getAlbumPhotos(id, "0");
          if (response2.status === Status.Ok && response2.data !== undefined) {
            setPictures(response2.data);
            setLoaded(true);
          }
        } else {
          alert("Failed to fetch album");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  /* Picture Dialog Controls */
  const [view, setViewOpen] = useState(false);
  const [index, setPicIndex] = useState(0);
  function changeView(i) {
    setPicIndex(i);
  }
  function toggelView(i) {
    changeView(i);
    setViewOpen(!view);
  }
  /* ////////////////////// */

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
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
    card: { width: "150px", height: "150px" },
    filler: {
      width: "174px",
      height: 0,
    },
    album: {
      margin: "auto",
      borderRadius: theme.spacing(2), // 16px
      transition: "0.3s",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      position: "relative",
      maxWidth: 700,
      marginLeft: "auto",
      overflow: "initial",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: theme.spacing(2),
      },
    },
    media: {
      width: "88%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(-3),
      height: 0,
      paddingBottom: "58%",
      borderRadius: theme.spacing(2),
      position: "relative",
      [theme.breakpoints.up("md")]: {
        width: "60%",
        marginLeft: theme.spacing(-3),
        marginTop: 0,
        paddingRight: 10,
        transform: "translateX(-8px)",
      },
      "&:after": {
        content: '" "',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: theme.spacing(2), // 16
        opacity: 0.5,
      },
    },
    button: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  if (isLoaded) {
    return (
      <Container className={classes.root}>
        <Card className={classes.album}>
          <CardMedia
            className={classes.media}
            image={(() => {
              if (album.first_photo == "default_path" && pictures.length > 0) {
                // console.log("here");
                return `/api/user/albums/${album.id}/photos/${pictures[0].id}`;
              }
              return album.first_photo;
            })()}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              {album.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontWeight: 500 }}
            >
              {album.description}
            </Typography>
            <Link
              to={{ pathname: `/annotate/${album.id}` }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="contained"
                size="small"
                disableElevation
                color="primary"
                className={classes.button}
              >
                Annotate
              </Button>
            </Link>

            <Link
              to={{ pathname: `/editalbum/${album.id}` }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="contained"
                size="small"
                color="primary"
                disableElevation
                className={classes.button}
              >
                Edit
              </Button>
            </Link>

            <Button
              variant="contained"
              size="small"
              disableElevation
              color="primary"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </CardContent>
        </Card>

        <Box component="ul" className={classes.tags}>
          <Typography style={{ marginRight: "6px", fontWeight: "bold" }}>
            Tags:
          </Typography>
          {album.tags.map((tag, i) => {
            return (
              <li key={i}>
                <Paper className={classes.chip} variant="outlined" square>
                  {tag}
                </Paper>
              </li>
            );
          })}
        </Box>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
          style={{ marginTop: "3em" }}
        >
          {pictures.map((pic, i) => {
            return (
              <Grid item key={i}>
                <Card className={classes.card}>
                  <CardActionArea onClick={() => toggelView(i)}>
                    <CardMedia
                      component="img"
                      height="150"
                      width="150"
                      image={`/api/user/albums/${album.id}/photos/${pic.id}`}
                    ></CardMedia>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
        </Grid>
        <PictureDialog
          pictures={pictures}
          view={view}
          toggelView={toggelView}
          changeView={changeView}
          albumID={album.id}
          toView={index}
        />
      </Container>
    );
  } else {
    return <AlbumSkeleton></AlbumSkeleton>;
  }
}
