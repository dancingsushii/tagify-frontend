import React from 'react';

import { Box, Button, Chip, Grid } from '@material-ui/core';
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
    minHeight:"90px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },
});
const handleDelete = () => {};

function PictureEditCard(props) {
  const classes = useStyles();

  const { avatarsrc, titel, tags, date, progres, img, id } = props;
  return (
    <Card >
      {/* Pic info */}
      <CardHeader
        action={
          <Button>
            <EditIcon />
          </Button>
        }
        title={titel}
        subheader={date}
      />
      {/*  Picture */}
      <CardMedia className={classes.media} image={img} title={titel} />
      
      {/* Tags */}
      <Grid container justify="center" className={classes.chips}>
      {tags.map((c) => (
          <Chip
            label={c}
            variant="default"
            color="primary"
            onDelete={handleDelete}
          />
        ))}
      </Grid>

      {/* Buttons */}
      <Grid style={{ marginTop: "10px", marginBottom: "10px" }} container item justify="space-around">
        <Button size="small" color="secondary" variant="contained">
          View
        </Button>
        <Button size="small" color="secondary" variant="contained">
          Delete
        </Button>
      </Grid>
    </Card>
  );
}

export default PictureEditCard;
