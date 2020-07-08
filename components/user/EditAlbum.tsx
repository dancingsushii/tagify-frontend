import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Box, Button, Card, CardActionArea, CardContent, CardHeader, Chip, CircularProgress, Grid,
    makeStyles, TextField, Typography
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';

import { Albums, UserPhoto } from '../../utils/BackendAPI';
import PictureEditCard from '../snippets/PictureThumbneil';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditAlbum(props) {
  let id = props.location.id;
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
  const [pictures, setPictures] = useState([""]);
  const [isLoaded, setLoaded] = useState(false);
  const [curentPage, setCurentPage] = useState(1);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [numDelet, setnumDelet] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Albums.getAlbum(id);
        if (response.responseCode === "Ok" && response.album !== undefined) {
          setAlbum(response.album);
          setTitle(response.album.title);
          setDescription(response.album.description);

          let pics = await Albums.getAlbumPhotos(
            id,
            (curentPage - 1).toString()
          );
          if (pics.responseCode === "Ok" && pics.photos !== undefined) {
            setPictures(pics.photos);
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
  }, [curentPage, numDelet]);

  //console.log(pictures);

  const elementsProPage = 20;
  const handlePageChange = (event, value) => {
    setCurentPage(value);
  };

  const handleEdit = () => {
    /* Temporaly only for demo. No contact with backedn*/
    album.title = title;
    album.description = description;
    /*                     */
    setFormOpen(false);
  };
  const [title, setTitle] = useState("sdfas");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const [toDelete, setToDelete] = useState("");

  const [open, setOpen] = useState(false);
  const [view, setViewOpen] = useState(false);
  const [form, setFormOpen] = useState(false);

  /* openes Delete confirmation dialog */
  function handleDelete(pic) {
    setToDelete(pic);
    setOpen(true);
  }

  function handleDeleteConfirmation() {
    /* here will come a asynce function to delete Album from server  */
    /* at the moment only lokal */
    const delPic = async (albumId, picId) => {
      try {
        let response = await UserPhoto.deletePhotoFromAlbum(albumId, picId);

        if (response === "Ok") {
          setnumDelet(numDelet + 1);
          setOpen(false);
        } else {
          setOpen(false);
          alert("Failed to Delete Picture");
        }
      } catch (error) {
        console.log(error);
      }
    };
    delPic(album.id, toDelete.id);
  }

  const handleClickOpen = () => {
    setFormOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      width: "100%",
      margin: 0,
      paddingTop: "56.25%",
      height: "150px",
    },
    title: {
      fontSize: 20,
      marginTop: "1em",
    },
  }));
  const classes = useStyles();

  function progress() {
    if (album.image_number > 0) {
      return (100 * album.tagged_number) / album.image_number;
    }
    return 0;
  }

  return (
    <Grid container justify="center" className={classes.root} spacing={1}>
      {/* Left columnt */}

      <Grid item sm={1}></Grid>

      {/* Middle column */}
      <Grid
        container
        justify="center"
        item
        xs={12}
        sm={10}
        md={10}
        spacing={2}
        style={{ margin: 0 }}
      >
        {/*   <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open dialog
        </Button> */}
        {/*Card wrapper */}
        <Grid
          item
          xs={12}
          container
          spacing={2}
          justify="space-around"
          style={{ margin: 0 }}
        >
          {/* Backround Card */}
          <Card>
            <Grid
              item
              xs={12}
              container
              spacing={2}
              justify="space-around"
              style={{ margin: 0 }}
            >
              {/* Album Titel Card */}
              <Grid item xs={12} sm={6}>
                <Card style={{ minHeight: "250px" }}>
                  <CardHeader
                    action={
                      <Button onClick={() => setFormOpen(true)}>
                        <EditIcon />{" "}
                      </Button>
                    }
                    title={album.title}
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {album.description}
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
                          value={progress()}
                        />
                      }
                      subheader={
                        <Grid item>
                          <Typography variant={"h6"}>
                            Images Number: {album.image_number}
                          </Typography>
                          <Typography variant={"h6"}>
                            Images Labeled: {album.tagged_number}
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
                      {album.tags.map((c, i) => (
                        <Chip
                          key={i}
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
                  style={{ float: "left" }}
                  count={
                    album.image_number / elementsProPage >= 1
                      ? Math.ceil((album.image_number - 1) / elementsProPage)
                      : 3
                  }
                  color="primary"
                  page={curentPage}
                  onChange={handlePageChange}
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

        {pictures.map((pic, j) => {
          if (pic.id !== undefined) {
            return (
              <Grid key={j} item xs={12} sm={6} md={4} lg={3}>
                <PictureEditCard
                  key={j}
                  picture={pic}
                  albumId={album.id}
                  tags={["example"]}
                  onDelete={handleDelete}
                />
              </Grid>
            );
          }
        })}
        <Grid item xs={12}>
          <Pagination
            style={{ float: "left" }}
            count={
              album.image_number / elementsProPage >= 1
                ? Math.ceil((album.image_number - 1) / elementsProPage)
                : 3
            }
            color="primary"
            page={curentPage}
            onChange={handlePageChange}
          />
        </Grid>
        {/* End of midle Column */}
      </Grid>

      {/* Right Column */}
      <Grid item sm={1}></Grid>

      <div>
        {/* <Button color="primary" onClick={handleDelete}>
          Dialog deleter
        </Button> */}

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
            <Typography variant={"body1"}>
              File: {toDelete.file_path}
            </Typography>
            <Typography variant={"body1"}>Id: {toDelete.id}</Typography>
            {/* Album info */}
            {/* <Card>
              
              <CardActionArea>
                <Link
                  to={{ pathname: "/album", id: toDelete.id }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardHeader
                    action={
                      <CircularProgressWithLabel
                        variant="static"
                        value={
                          (toDelete.tagged_number * 100) / toDelete.image_number
                        }
                      />
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
                    
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card> */}
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
              onClick={handleDeleteConfirmation}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/*     <Button onClick={() => setViewOpen(true)}>view</Button> */}
      {/* ####################################################
       */}

      {/* Big pic view */}
      <div>
        {/* Dialog box for del view */}
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={view}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Grid container spacing={1} item sm={12}>
            <Grid item sm={12} md={6}>
              <img src="https://picsum.photos/id/21/300/300" alt="" />
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant={"body1"}>Name: pic1.jpg</Typography>
              <Typography variant={"body1"}>Id: 22</Typography>
            </Grid>
          </Grid>

          <DialogTitle
            id="alert-dialog-slide-title"
            style={{ alignSelf: "center" }}
          ></DialogTitle>
          <DialogContent>
            <img src="https://picsum.photos/id/21/300/300" alt="" />

            <Typography variant={"body1"}>Id: </Typography>
            {/* Album info */}
            {/* <Card>
              
              <CardActionArea>
                <Link
                  to={{ pathname: "/album", id: toDelete.id }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardHeader
                    action={
                      <CircularProgressWithLabel
                        variant="static"
                        value={
                          (toDelete.tagged_number * 100) / toDelete.image_number
                        }
                      />
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
                    
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card> */}
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
              onClick={handleDeleteConfirmation}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* ///////////////////////////////////////////////////////// */}
      {/* Form dialog */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={form}
        onClose={() => setFormOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Chnge Album name or description
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.title} gutterBottom>
            Album name:
          </Typography>
          <TextField
            required
            fullWidth
            size="small"
            name="title"
            variant="outlined"
            value={title}
            onChange={handleNameChange}
          />
          <Typography className={classes.title} gutterBottom>
            Album description:
          </Typography>
          <TextField
            required
            fullWidth
            // helperText={errors.description}
            size="small"
            name="description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFormOpen(false)}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
