import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TagifyAlertDialog(props) {
  const { Title, Descrpition, isOpen, ConfirmTxt, CancelTxt } = props;

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={{ alignSelf: "center" }}
      >
        {Title}
      </DialogTitle>
      <DialogContent>
        <Typography variant={"body1"}>{Descrpition}</Typography>

        <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
      </DialogContent>

      <DialogActions style={{ justifyContent: "space-around" }}>
        {CancelTxt ? (
          <Button
            onClick={props.handleCancel}
            variant="contained"
            color="primary"
          >
            {CancelTxt}
          </Button>
        ) : (
          ""
        )}

        {ConfirmTxt ? (
          <Button
            onClick={props.handleConfirm}
            variant="contained"
            color="primary"
          >
            {ConfirmTxt}
          </Button>
        ) : (
          ""
        )}
      </DialogActions>
    </Dialog>
  );
}
export default TagifyAlertDialog;

/* 
//AlertBox controll //////////

const [alertTitle, setAlertTitle] = useState("");
const [alertDescrpition, setAlertDescrpition] = useState("");
const [alertOpen, setAlertOpen] = useState(false);
const [alertConfirmTxt, setAlertConfirmTxt] = useState("");
const [alertCancelTxt, setAlertCancelTxt] = useState("");
const [alertHandleCancel, setAlertHandleCancel] = useState(() => () => {
  setAlertOpen(false);
});
const [alertHandleConfirm, setAlertHandleConfirm] = useState(() => () => {
  setAlertOpen(false);
});
const [alertHandleClose, setAlertHandleClose] = useState(() => () => {
  setAlertOpen(false);
});
///////////////////////////////

<TagifyAlertDialog
Title={alertTitle}
Descrpition={alertDescrpition}
isOpen={alertOpen}
ConfirmTxt={alertConfirmTxt}
CancelTxt={alertCancelTxt}
handleClose={alertHandleClose}
handleConfirm={alertHandleConfirm}
handleCancel={alertHandleCancel}
/> */
