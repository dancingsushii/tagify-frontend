import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip, CircularProgress,
    Grid, makeStyles, Typography
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Pagination from '@material-ui/lab/Pagination';

import { UserAlbum } from '../../utils/BackendAPI';
import Albumthumbneil from '../snippets/Albumthumbneil';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyAlbums(props) {
  const [isLoaded, setLoaded] = useState(false);
  const [AlbumList, setAlbums] = useState([
    {
      id: 1,
      title: "",
      description: "",
      tags: [""],
      image_number: 0,
      tagged_number: 0,
      users_id: 0,
      first_photo: "https://picsum.photos/id/33/300/300",
    },
  ]);

  const [numDelete, setNumDelete] = useState(0);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        let response = await UserAlbum.getMyAlbums();

        if (response.responseCode === "Ok" && response.albums !== undefined) {
          setAlbums(response.albums);
          //setAlbums(Albums1);
        } else {
          alert("Failed to fetch album");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbum();
  }, [numDelete]);

  const [curentPage, setCurentPage] = useState(1);

  const [toDelete, setToDelete] = useState({
    id: 3,
    title: "Anima",
    description: "test123 supesr album",
    tags: ["back cat", "white cat", "dog"],
    image_number: 0,
    tagged_number: 0,
    users_id: 2,
    first_photo: "https://picsum.photos/id/33/300/300",
  });

  const [open, setOpen] = useState(false);

  const elementsProPage = 8;

  /* openes Delete confirmation dialog */
  function handleDelete(titel) {
    const to = AlbumList.find((el) => el.title.match(titel));
    setToDelete(to);
    setOpen(true);
  }

  function handleDeleteConfirmation(albumId) {
    /* here will come a asynce function to delete Album from server  */
    /* at the moment only lokal */
    const delAlbum = async (albumId) => {
      try {
        let response = await UserAlbum.deleteOwnAlbum(albumId);

        /* TODO response Handling if backend adds it 
        if (response === "Ok") {
          
          setOpen(false);
        } else {
          setOpen(false);
          alert("Failed to Delete Picture");
        } */
      } catch (error) {
        console.log(error);
      }
    };

    delAlbum(albumId);
    setNumDelete(numDelete + 1);
    setOpen(false);
  }

  const handlePageChange = (event, value) => {
    setCurentPage(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalImages = () => {
    let total = 0;
    AlbumList.forEach((c) => (total += c.image_number));
    return total;
  };
  const totalTagged = () => {
    let tagged = 0;
    AlbumList.forEach((c) => (tagged += c.tagged_number));
    return tagged;
  };

  function progress() {
    if (totalImages() > 0) {
      return (100 * totalTagged()) / totalImages();
    }
    return 0;
  }

  const makeAlbumThumbneil = (cardProps) => {
    return (
      <Grid key={cardProps.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Albumthumbneil onDelete={handleDelete} {...cardProps} />
      </Grid>
    );
  };

  const renderThumbneils = () => {
    let end = curentPage * elementsProPage;
    if (end > AlbumList.length) {
      end = AlbumList.length;
    }
    const start = (curentPage - 1) * elementsProPage;
    return AlbumList.slice(start, end).map((c) => makeAlbumThumbneil(c));
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
    media: {
      maxHeight: "200px",
      maxWidth: "100px",
      margin: 0,
      paddingTop: "56.25%",
      height: "150px",
    },
  }));
  const classes = useStyles();

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
          <Card style={{ width: "100%" }}>
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
                            Number of Albums: {AlbumList.length}
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
                          value={progress()}
                        />
                      }
                      subheader={
                        <Grid item>
                          <Typography variant={"h6"}>
                            Total Images : {totalImages()}
                          </Typography>
                          <Typography variant={"h6"}>
                            Total Labeled: {totalTagged()}
                          </Typography>
                        </Grid>
                      }
                    />
                  </Card>
                </Grid>
              </Grid>

              {/* card with tags */}
              {/* <Grid item xs={12}>
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
              </Grid> */}
            </Grid>
            <Pagination
              style={{ float: "left" }}
              count={
                AlbumList.length / elementsProPage >= 1
                  ? Math.ceil((AlbumList.length - 1) / elementsProPage)
                  : 1
              }
              color="primary"
              page={curentPage}
              onChange={handlePageChange}
            />
            <Button
              className={classes.button}
              style={{ float: "right", margin: "5px" }}
              variant="contained"
              color="primary"
              href={"/addalbum"}
            >
              Add new Album
            </Button>
          </Card>
        </Grid>{" "}
        {/* end of upper part */}
        {renderThumbneils()}
      </Grid>

      <Grid item xs={1} sm={1} md={1}></Grid>
      <Pagination
        style={{ marginTop: "20px" }}
        count={
          AlbumList.length / elementsProPage >= 1
            ? Math.ceil((AlbumList.length - 1) / elementsProPage)
            : 1
        }
        color="primary"
        page={curentPage}
        onChange={handlePageChange}
      />
      <div>
        {/* Dialog box for delete confirmation */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            style={{ alignSelf: "center" }}
          >
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Card>
              {/* Album info */}
              <CardActionArea>
                <Link
                  to={{ pathname: "/album", id: toDelete.id }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardHeader
                    action={
                      <CircularProgressWithLabel variant="static" value={0} />
                    }
                    title={toDelete.title}
                    subheader={toDelete.users_id}
                  />
                  <CardMedia
                    className={classes.media}
                    image={toDelete.first_photo}
                    title={toDelete.title}
                  />
                  <CardContent>
                    <Typography variant={"body2"}>
                      AlbumID: {toDelete.id}
                    </Typography>
                    <Typography variant={"body2"}>
                      description: {toDelete.description}
                    </Typography>
                    <Typography variant={"body2"}>
                      image_number: {toDelete.image_number}
                    </Typography>
                    <Typography variant={"body2"}>
                      tagged_number: {toDelete.tagged_number}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              style={{ flex: "left" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteConfirmation(toDelete.id)}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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

const Albums1 = [
  {
    title: "Animals   ",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/237/300/300",
    tags: ["#Dog", "#dogs", "#labrador"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Nature",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/33/300/300",
    tags: ["#Three", "#woods"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Oranges",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://vignette.wikia.nocookie.net/testo/images/f/fa/Pomara%C5%84cza.png/revision/latest?cb=20190305224547&path-prefix=pl",
    tags: ["#orange", "#oranges"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Laptops ",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/119/3264/2176.jpg?hmac=PYRYBOGQhlUm6wS94EkpN8dTIC7-2GniC3pqOt6CpNU",
    tags: ["#Apple", "#lenovo"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Shoes",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/21/300/300",
    tags: ["#Hills", "#sneakers"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Watches",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://i.ytimg.com/vi/ydXgwo_nvuk/maxresdefault.jpg",
    tags: ["#Rolex", "#sixo", "#berd"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Architectrure",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1048/5616/3744.jpg?hmac=N5TZKe4gtmf4hU8xRs-zbS4diYiO009Jni7n50609zk",
    tags: ["#circle", "#ball", "#berd"],
    id: 22,
    description: "test123 super album",
  },

  {
    title: "People",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://static.polityka.pl/_resource/res/path/57/ff/57ff8ee9-b145-45e3-bd37-3bb9cf91d23c_f1400x900",
    tags: ["#man", "#woman"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Ships",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/211/300/300",
    tags: ["#circle", "#ball", "#berd"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Instruments ",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1082/5416/3611.jpg?hmac=GrASx5oGYbTwT4xyJDYkurgXFFfgj37WHvaJNe8Sr1E",
    tags: ["#circle", "#ball", "#berd"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Bicycle",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/1077/3000/1995",
    tags: ["#Bicycle", "#monocycle"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Architectrure",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1048/5616/3744.jpg?hmac=N5TZKe4gtmf4hU8xRs-zbS4diYiO009Jni7n50609zk",
    tags: ["#block", "#Road"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Dogs ",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k",
    tags: ["#jork", "#terier"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Nature",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/33/300/300",
    tags: ["#circle", "#ball", "#berd"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Cars ",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1071/3000/1996.jpg?hmac=rPo94Qr1Ffb657k6R7c9Zmfgs4wc4c1mNFz7ND23KnQ",
    tags: ["#mercedes", "#bmv", "#opel"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "Je",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/21/300/300",
    tags: ["#circle", "#ball", "#berd"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "17",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1048/5616/3744.jpg?hmac=N5TZKe4gtmf4hU8xRs-zbS4diYiO009Jni7n50609zk",
    tags: ["#block", "#Road"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "18 ",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k",
    tags: ["#jork", "#terier"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "19",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo: "https://picsum.photos/id/33/300/300",
    tags: ["#circle", "#ball", "#berd"],
    id: 22,
    description: "test123 super album",
  },
  {
    title: "20 ",
    image_number: 20,
    tagged_number: 11,
    users_id: "Maniek",
    first_photo:
      "https://i.picsum.photos/id/1071/3000/1996.jpg?hmac=rPo94Qr1Ffb657k6R7c9Zmfgs4wc4c1mNFz7ND23KnQ",
    tags: ["#mercedes", "#bmv", "#opel"],
    id: 22,
    description: "test123 super album",
  },
];
export default MyAlbums;
