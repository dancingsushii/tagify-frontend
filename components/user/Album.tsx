import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import React, { useEffect, useState } from "react";

export function Album() {
  const [album, setAlbum] = useState({
    album_id: 1,
    album_name: "Dummy album",
    tags: ["dog", "cat", "husky", "bulldog"],
    description:
      "This is a dummy album with random pictures, used for presentation purposes",
    owner: "Bob",
  });
  const [pictures, setPictures] = useState({ pics: [] });
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `https://dog.ceo/api/breeds/image/random/20`
        );
        const data = await result.json();
        // var picsUrl = data.map(function (pic) {
        //   return pic.download_url;
        // });
        setPictures({ pics: data.message });
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
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
        // backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
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

  return (
    <Container className={classes.root}>
      <Card className={classes.album}>
        <CardMedia
          className={classes.media}
          image="https://media.nature.com/lw800/magazine-assets/d41586-020-01430-5/d41586-020-01430-5_17977552.jpg"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {album.album_name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontWeight: 500 }}
          >
            {album.description}
          </Typography>
          <Button
            variant="contained"
            size="small"
            disableElevation
            className={classes.button}
          >
            Annotate
          </Button>

          <Button
            variant="contained"
            size="small"
            disableElevation
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
        {pictures.pics.map((pic, i) => {
          const url = `https://picsum.photos/200/300?random=${i}`;
          return (
            <Grid item className={classes.block} key={i}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  height="150"
                  width="150"
                  image={pic}
                ></CardMedia>
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
    </Container>
  );
}
