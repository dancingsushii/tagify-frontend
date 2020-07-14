import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 function PictureDialog(props){
  const [pictures, setPictures] = useState(props.pictures);
  function handleNext() {
   
    if (props.toView === pictures.length - 1) {
      console.log("An die grenze");
    } else {
     
      props.changeView(props.toView+1);
     
    }
  }
  function handleBefor() {
    
    
    if (props.toView === 0 {
      console.log("An die grenze");
    } else {
      props.changeView(props.toView-1);
    }
  }
  return(
  
      <Dialog
        open={props.view}
        maxWidth={"lg"}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            minWidth: "40vw",
            maxHeight: "100vh",
            margin: 0,
          },
        }}
        onClose={() => props.toggelView(props.toView)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Button
         style={{justifyContent:"left" }}
        color="primary"
        onClick={() => props.toggelView(props.toView)}>
          <CloseIcon />
        </Button>
        
        <img
          id={"photo"}
          src={`/api/user/albums/${props.albumID}/photos/${pictures[props.toView].id}`}
          alt=""
          style={{
            height: "70vh",
            objectFit: "contain",
          }}
        />

        <div
          style={{
            width: "30vw",
            alignSelf:"center",
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1vh",
          }}
        >
          <Button
            onClick={handleBefor}
            color="primary"
            style={{ flex: "left" }}
          >
            <SkipPreviousIcon />
          </Button>
          <Button onClick={handleNext} color="primary">
            <SkipNextIcon />
          </Button>
        </div>
      </Dialog>

  );
}
export default PictureDialog;