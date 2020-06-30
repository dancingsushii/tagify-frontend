import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { Card, Container, makeStyles } from '@material-ui/core';

export function AlbumSkeleton() {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
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
      height: "25em",
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
    },
    media: {
      width: "60%",
      marginTop: 0,
      marginLeft: "auto",
      paddingRight: 10,
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
        <div style={{ margin: "auto", width: "88%", marginTop: "-2em" }}>
          <Skeleton height={"14em"} width={"100%"}></Skeleton>
        </div>
        <div
          style={{
            height: "10em",
            width: "88%",
            margin: "auto",
          }}
        >
          <div style={{ lineHeight: 3 }}>
            <Skeleton width={"60%"} height={30}></Skeleton>
          </div>
          <div>
            <Skeleton count={3}></Skeleton>
          </div>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "40%", marginRight: 5 }}>
              <Skeleton width={"97%"} height={35}></Skeleton>
            </div>
            <div style={{ width: "40%" }}>
              <Skeleton width={"97%"} height={35}></Skeleton>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
