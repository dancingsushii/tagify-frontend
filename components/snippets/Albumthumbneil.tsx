import React from 'react';

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
    description,
    tags,
    image_number,
    tagged_number,
    users_id,
    first_photo,
  } = props;

  return (
    <Card className={classes.root}>
      {/* Album info */}
      <CardActionArea href={"/album"}>
        <CardHeader
          action={
            <CircularProgressWithLabel
              variant="static"
              value={(tagged_number * 100) / image_number}
            />
          }
          title={title}
          subheader={users_id}
        />

        {/* Album Thumbneil */}

        <CardMedia
          className={classes.media}
          image={first_photo}
          title={title}
        />
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
        <Button
          size="small"
          color="primary"
          variant="contained"
          href="editalbum"
        >
          Edit
        </Button>
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
