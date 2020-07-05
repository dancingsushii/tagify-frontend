import React from 'react';
import Skeleton from 'react-loading-skeleton';

import {
    Card, CardActionArea, CardContent, CardMedia, Container, Grid, makeStyles
} from '@material-ui/core';

export function DashboardSkeleton() {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    media: { width: 230, height: 140 },
    card: {
      height: 295,
      maxWidth: 345,
    },
    filler: {
      width: 254,
      height: 0,
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
          style={{ marginTop: "3em" }}
        >
          {Array(9)
            .fill(1)
            .map((_index, i) => {
              return (
                <Grid item key={i}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia>
                        <Skeleton width={230} height={145}></Skeleton>
                      </CardMedia>
                    </CardActionArea>
                    <CardContent>
                      <Skeleton width={"100%"} height={38}></Skeleton>
                      <div style={{ lineHeight: 6 }}>
                        <Skeleton width={"66%"} height={34}></Skeleton>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
          <Grid item className={classes.filler}></Grid>
        </Grid>
      </Container>
    </>
  );
}
