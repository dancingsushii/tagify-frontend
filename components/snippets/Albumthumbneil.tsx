import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, CardActionArea, Chip, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

const useStyles = makeStyles((theme) => ({
  root: {},
  bullet: {},
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  action: {
    display: "flex",
    aligItems: "center",
  },
  media: {
    width: "100%",
    margin: 0,
    paddingTop: "56.25%",
    height: "150px",
  },
}));

function Albumthumbneil(props) {
  const classes = useStyles();

  const {
    id,
    title,
    image_number,
    tagged_number,
    users_id,
    first_photo,
  } = props;
  function progress() {
    if (image_number > 0) {
      return (100 * tagged_number) / image_number;
    }
    return 0;
  }

  return (
    <Card className={classes.root}>
      {/* Album info */}
      <CardActionArea>
        <Link
          to={{ pathname: `/album/${id}` }
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardHeader
            action={
              <CircularProgressWithLabel variant="static" value={progress()} />
            }
            title={title}
            subheader={users_id}
          />

          {/* Album Thumbneil */}
            
          <CardMedia
            className={classes.media}
            image={`/api/user/albums/${id}/photos/${first_photo}`}
            title={title}
          />
        </Link>
      </CardActionArea>

      {/* Falls man tags auf die Thumbneil sehen will dann auskomentieren */}
      {/* <div className={classes.chips} style={{ minHeight: "90px" }}>
        {tags.map((c) => (
          <Chip
            label={c}
            variant="default"
            color="default"
            avatar={<Avatar>{c.charAt(1)}</Avatar>}
          />
        ))}
      </div> */}

      {/* Buttons */}
      <Grid
        style={{ marginTop: "10px", marginBottom: "10px" }}
        container
        item
        justify="space-around"
      >
        <Link
          to={{ pathname: `/editalbum/${id}` }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button size="small" color="primary" variant="contained">
            Edit
          </Button>
        </Link>

        <Button
          onClick={() => props.onDelete(title)}
          size="small"
          color="primary"
          variant="contained"
        >
          Delete
        </Button>
      </Grid>
    </Card>
  );
}

export default Albumthumbneil;
