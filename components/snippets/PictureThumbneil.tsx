import React from 'react';

import { Box, Button, CardActionArea, Chip, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
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
  chips: {
    minHeight: "40px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",

    margin: "10px",
  },
}));
//const handleDelete = () => {};

function PictureEditCard(props) {
  const classes = useStyles();

  const { tags, picture, albumId } = props;
  return (
    <Card>
      {/* Pic info */}
      <CardHeader
        /*  action={
          <Button onClick={() => props.onEdit(picture)}>
            <EditIcon />
          </Button>
        } */
        title={picture.file_path}
        subheader={"Id: " + picture.id}
        action={
          picture.verified ? (
            <p style={{ color: "green" }}>Verified</p>
          ) : (
            <p style={{ color: "red" }}>Unverified</p>
          )
        }
      />
      <CardActionArea onClick={() => props.onView(props.index)}>
        {/*  Picture */}
        <CardMedia
          className={classes.media}
          image={`/api/user/albums/${albumId}/photos/${picture.id}`}
          title={picture.id}
        />
      </CardActionArea>

      {/* Tags */}
      <div className={classes.chips}>
        <Chip
          key={picture.id}
          label={picture.tagged ? picture.tag : "untaged"}
          variant="default"
          color={picture.tagged ? "primary" : "default"}
        />
      </div>

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
          onClick={() => props.onView(props.index)}
        >
          View
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => props.onDelete(picture)}
        >
          Delete
        </Button>
      </Grid>
    </Card>
  );
}

export default PictureEditCard;
