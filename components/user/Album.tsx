import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, makeStyles, Paper
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Pagination from '@material-ui/lab/Pagination';

import { Albums, PhotoInformation, Status } from '../../utils/BackendAPI';
import { SimpleDialog } from '../snippets/DownloadDialog';
import PictureDialog from '../snippets/PictureDialog';
import TagifyAlertDialog from '../snippets/TagifyAlertDialog';

export function Album(props) {
  const [album, setAlbum] = useState({
    id: 1,
    title: "",
    description: "",
    tags: [""],
    image_number: 0,
    tagged_number: 0,
    users_id: 0,
    first_photo: 0,
  });
  //AlertBox controll //////////

  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescrpition, setAlertDescrpition] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfirmTxt, setAlertConfirmTxt] = useState("");

  ///////////////////////////////
  /* Pagination Controls */
  const [curentPage, setCurentPage] = useState(1);
  const elementsProPage = 20;
  const handlePageChange = (event, value) => {
    setCurentPage(value);
  };
  /* ////////////////// */

  const [pictures, setPictures] = useState<Array<PhotoInformation>>([]);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = props.match.params.id;
        let response = await Albums.getAlbum(id);
        if (response.status === Status.Ok && response.data !== undefined) {
          setAlbum(response.data);
          let response2 = await Albums.getAlbumPhotos(id, curentPage - 1);
          if (response2.status === Status.Ok && response2.data !== undefined) {
            setPictures(response2.data);
            setLoaded(true);
          }
        } else {
          setAlertConfirmTxt("ok");
          setAlertDescrpition("Failed to fetch album");
          setAlertOpen(true);
          //alert("Failed to fetch album");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [curentPage]);
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

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
    content: {
      wordBreak: "break-word",
      maxWidth: "100%",
      [theme.breakpoints.up("md")]: {
        maxWidth: "50%",
      },
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
              if (album.first_photo == null) {
                // console.log("here");
                return `https://generative-placeholders.glitch.me/image?width=400&height=300&style=cubic-disarray`;
              }
              return `/api/user/albums/${album.id}/photos/${album.first_photo}`;
            })()}
          />
          <CardContent className={classes.content}>
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
              onClick={handleClickOpen}
            >
              Download
            </Button>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
              id={album.id}
            />
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
        <Pagination
          style={{ float: "left" }}
          count={
            album.image_number / elementsProPage >= 1
              ? Math.ceil(album.image_number / elementsProPage)
              : 1
          }
          color="primary"
          page={curentPage}
          onChange={handlePageChange}
        />
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
                      height="150px"
                      width="150px"
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
        {album.image_number > 20 ? (
          <Pagination
            style={{ float: "left" }}
            count={
              album.image_number / elementsProPage >= 1
                ? Math.ceil(album.image_number / elementsProPage)
                : 1
            }
            color="primary"
            page={curentPage}
            onChange={handlePageChange}
          />
        ) : (
          ""
        )}
        <PictureDialog
          pictures={pictures}
          view={view}
          toggelView={toggelView}
          changeView={changeView}
          albumID={album.id}
          toView={index}
        />
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
    );
  } else {
    return <div></div>;
  }
}
