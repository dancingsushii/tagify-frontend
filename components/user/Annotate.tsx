import React, { useEffect, useState } from 'react';

import {
    Box, Button, Card, CardActions, CardHeader, CardMedia, Chip, Grid, LinearProgress,
    LinearProgressProps, makeStyles, Theme, Typography
} from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

import { Albums, Status, UserTag } from '../../utils/BackendAPI';

export function Annotate(props) {
  const [isLoaded, setLoaded] = useState(false);

  // GET album for album info and tags
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

  // GET photos for tagging
  const [photos, setPhotos] = useState([
    {
      id: 1,
      file_path: "",
      tagged: false,
      tag: "",
      timestamp: "",
    },
  ]);

  // HTTP method for it
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Albums.getAlbum(id);
        if (response.status === Status.Ok && response.data !== undefined) {
          setAlbum(response.data);
          let response2 = await UserTag.getPhotos(id);
          if (response2.status === Status.Ok && response2.data !== undefined) {
            setPhotos(response2.data);
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

  // CSS
  const useStyles = makeStyles((theme) => ({
    // root styling for main container
    root: {
      width: "100%",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      paddingBottom: theme.spacing(10),
      justify: "center",
    },
    // text styling
    title: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      justifySelf: "center",
      textAlign: "center",
    },
    // tags grid styling
    chips: {
      display: "flex",
      justifyContent: "left",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.3),
      },
    },
    media: {
      width: "100%",
      margin: 0,
      paddingTop: "56.25%",
      height: "150px",
    },
    progressBar: {
      marginLeft: "10px",
      width: "100%",
      marginRight: "10px",
    },
    buttonsCard: {
      justifyItems: "center",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderSpacing: 5,
    },
  }));
  const classes = useStyles();

  // state for next and previous photo
  const [index, setIndex] = useState(0);

  // function for rendering next photo ocClick() next button
  const onClickNext = () => {
    if (index + 1 === photos.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const onclickBack = () => {
    if (index - 1 === -1) {
      setIndex(photos.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  if (isLoaded) {
    return (
      <Grid className={classes.root}>
        {/* container for grid */}
        <Grid item container>
          {/* left empty column */}
          <Grid item sm={1}></Grid>
          {/* middle MAIN column */}
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
                  {/* album title section */}
                  <Grid item sm={6} spacing={2}>
                    <Card>
                      <CardHeader
                        title={album.title}
                        className={classes.title}
                      />
                    </Card>
                  </Grid>

                  {/* tags section */}
                  <Grid item xs={12}>
                    <Card>
                      <Typography variant={"h6"}>Tags</Typography>
                      <div className={classes.chips}>
                        {album.tags.map((c) => (
                          <Chip label={c} variant="default" color="primary" />
                        ))}
                      </div>
                    </Card>
                  </Grid>

                  {/* TODO progress bar section with current tagged photos in album percentage */}
                  <div className={classes.progressBar}>
                    <LinearProgressWithLabel value={30} />
                  </div>

                  {/* TODO with mapping picture section */}

                  {/* no need if mapping DONE */}
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title={album.title}></CardHeader>
                      <CardMedia
                        className={classes.media}
                        image={`/api/user/albums/${album.id}/photos/${photos[index].id}`}
                      />
                    </Card>
                  </Grid>

                  {/* TODO buttons section with links*/}
                  <Grid item xs={12}>
                    <Card>
                      <CardActions className={classes.buttonsCard}>
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={onclickBack}
                        >
                          Back
                        </Button>
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={() => {
                            alert("submit tags");
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={onClickNext}
                        >
                          Next
                        </Button>
                      </CardActions>

                      {/* TODO verify button with link*/}
                      <CardActions className={classes.buttonsCard}>
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={() => {
                            alert("VERIFY");
                          }}
                        >
                          Verify
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>

                {/* end of Backround Card */}
              </Card>
              {/* card Wrapper end */}
            </Grid>
            {/* end of middle Column */}
          </Grid>
          {/* progress bar  */}

          {/* right empty column */}
          <Grid item sm={1}></Grid>
        </Grid>
      </Grid>
    );
  } else {
    // TODO skeleton for loading page
    return <Typography> Something went wrong</Typography>;
  }
}

// override existing linear progress bar with custom height
const CustomLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 25,
    },
  })
)(LinearProgress);

// progress bar
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" marginTop="10px" height="40px" mr={1}>
        <CustomLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
