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
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Pagination from '@material-ui/lab/Pagination';

import { Albums, PhotoInformation, Status, UserAlbum, UserPhoto } from '../../utils/BackendAPI';
import { SimpleDialog } from '../snippets/DownloadDialog';
import PictureDialog from '../snippets/PictureDialog';
import PictureEditCard from '../snippets/PictureThumbneil';
import TagifyAlertDialog from '../snippets/TagifyAlertDialog';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditAlbum(props) {
  //let id = 1;
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
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [numDelet, setnumDelet] = useState(0);

  /* Pagination Controls */
  const [curentPage, setCurentPage] = useState(1);
  const elementsProPage = 20;
  const handlePageChange = (event, value) => {
    setCurentPage(value);
  };
  /* ////////////////// */
  /*////// AlertBox controll////// */
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescrpition, setAlertDescrpition] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfirmTxt, setAlertConfirmTxt] = useState("");
  /* ////////////////////////////// */

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Albums.getAlbum(id);
        if (response.status === Status.Ok && response.data !== undefined) {
          setAlbum(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);

          let pics = await Albums.getAlbumPhotos(id, curentPage - 1);
          if (pics.status === Status.Ok && pics.data !== undefined) {
            setPictures(pics.data);

            setLoaded(true);
          }
        } else {
          setAlertConfirmTxt("ok");
          setAlertDescrpition("Failed to fetch album");
          setAlertOpen(true);

          // alert("Failed to fetch album");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [curentPage, numDelet]);

  //console.log(pictures);

  //Picture to Delete, to View or to Edit.
  const [toDelete, setToDelete] = useState("");

  /* Control of Gallery Big View */
  /*   const [view, setViewOpen] = useState(false);
  function handleView(pic) {
    setToDelete(pic);
    setViewOpen(true);
  }
  function handleNext() {
    let index = pictures.indexOf(toDelete);
    if (index === pictures.length - 1) {
      console.log("An die grenze");
    } else {
      console.log(toDelete);
      setToDelete(pictures[index + 1]);
      console.log(toDelete);
    }
  }
  function handleBefor() {
    console.log(toDelete);
    let index = pictures.indexOf(toDelete);
    if (index === 0) {
      console.log("An die grenze");
    } else {
      setToDelete(pictures[index - 1]);
      console.log(toDelete);
    }
  } */
  /* /////////////////////////////// */

  /*/ Picture Dialog Controls////// */
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

  /* Editing pic file_path will be added maybe in the future */
  /* const [picTmp, setPicTmp] = useState("");
  const [picForm, setPicFormOpen] = useState(false);
  function handlePicEdit(pic) {
    setPicTmp(pic.file_path);
    setPicFormOpen(true);
  }
  const handlePicNameChange = (event, value) => {
    setPicTmp(value);
    console.log(value);
  };
  function ConfirmEdit() {
    /*   here comes backend api                  */

  /*   setPicFormOpen(false);
    console.log(toDelete);
  } */

  /* //////////////////////////////////////////// */

  /*/////////// Deleting of a picture////////// */
  const [open, setOpen] = useState(false);
  /* openes Delete confirmation dialog */
  function handleDelete(pic) {
    setToDelete(pic);
    setOpen(true);
  }
  function handleDeleteConfirmation() {
    /*is connected with backend */
    const delPic = async (albumId, picId) => {
      try {
        let response = await UserPhoto.deletePhotoFromAlbum(albumId, picId);

        if (response.status === Status.Ok) {
          setnumDelet(numDelet + 1);

          setOpen(false);
        } else {
          setOpen(false);

          setAlertConfirmTxt("ok");
          setAlertDescrpition("Failed to Delete Picture");
          setAlertOpen(true);

          //  alert("Failed to Delete Picture");
        }
      } catch (error) {
        console.log(error);
      }
    };

    delPic(album.id, toDelete.id);
  }
  /* /////////////////////// ///////////////////*/

  /* //Editing Album name and description////// */
  const [form, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handleNameChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function editConfirmation() {
    const upAlbum = async () => {
      try {
        const body = {
          title: title,
          description: description,
        };
        let response = await UserAlbum.updateAlbum(album.id, body);

        /* TODO handling response if backend inplements it  */
      } catch (error) {
        console.log(error);
      }
    };
    upAlbum();
    setnumDelet(numDelet + 1);
    setFormOpen(false);
    // console.log("in edit confirmation");
  }
  /* ////////////////////////////////////////// */

  /* ////ProgressWheel///////////////////////////////////////// */
  function progress() {
    if (album.image_number > 0) {
      return (100 * album.tagged_number) / album.image_number;
    }
    return 0;
  }
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
  /* ////////////////////////////////////////////////////// */

  // Download dialog

  const [openD, setOpenD] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpenD(true);
  };

  const handleClose = (value: string) => {
    setOpenD(false);
    setSelectedValue(value);
  };

  // End dialog
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
      float: "right",
      [theme.breakpoints.down("md")]: {
        width: "31%",
        float: "none",
        height: "70px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "98%",
      },

      margin: "5px",
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

  return (
    <Grid container className={classes.root} spacing={1}>
      {/* Left columnt */}

      <Grid item sm={1}></Grid>

      {/* Middle column */}
      <Grid
        container
        justify="flex-start"
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
          <Card style={{ margin: 0, width: "100%" }}>
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
                        <Chip key={i} label={c} variant="default" />
                      ))}
                    </div>
                  </Card>
                </Grid>
              </Grid>

              {/* Pagination and add  Pic button */}
              <Grid item xs={12}>
                <div
                  style={{
                    float: "right",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Download Album
                  </Button>
                  <SimpleDialog
                    selectedValue={selectedValue}
                    open={openD}
                    onClose={handleClose}
                    id={album.id}
                  />
                  <Link
                    to={{ pathname: `/addalbum` }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Add Pictures
                    </Button>
                  </Link>
                  <Link
                    to={{ pathname: `/album/${album.id}` }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Back to Album
                    </Button>
                  </Link>
                </div>
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
              </Grid>
            </Grid>
            {/* End of Backround Card */}
          </Card>

          {/* Card Wrapper end */}
        </Grid>

        {/* Picture Thumbneils */}

        {isLoaded
          ? pictures.map((pic, j) => {
              if (pic.id !== undefined && pic !== undefined) {
                return (
                  <Grid key={j} item xs={12} sm={6} md={4} lg={3}>
                    <PictureEditCard
                      index={j}
                      key={j}
                      picture={pic}
                      albumId={album.id}
                      tags={["example"]}
                      onDelete={handleDelete}
                      onView={toggelView}
                    />
                  </Grid>
                );
              }
            })
          : ""}
        <Grid item xs={12}>
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
        </Grid>
        {/* End of midle Column */}
      </Grid>

      {/* Right Column */}
      <Grid item sm={1}></Grid>

      <div>
        {/* Dialog box for delete confirmation */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
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

            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
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

      {/* ##################################################
      {/* ///////////////////////////////////////////////////////// */}
      {/* Form dialog */}
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
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

          <Button
            onClick={editConfirmation}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* /////////////will be used maybe in the future/////////////////////////////// */}
      {/* edit Pic  dialog */}
      {/* <Dialog
        open={picForm}
        onClose={() => setPicFormOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Picture name:</DialogTitle>
        <DialogContent>
          
          <TextField
            required
            fullWidth
            size="small"
            name="title"
            variant="outlined"
            value={picTmp}
            onChange={handlePicNameChange}
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

          <Button onClick={ConfirmEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog> */}

      <PictureDialog
        pictures={pictures}
        view={view}
        toggelView={toggelView}
        changeView={changeView}
        albumID={id}
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
    </Grid>
  );
}

export default EditAlbum;
