import React, { useState } from 'react';

import {
    Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/styles';

import { Albums } from '../../utils/BackendAPI';
import TagifyAlertDialog from './TagifyAlertDialog';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  id: number;
}

export function SimpleDialog(props) {
  const classes = useStyles();
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescrpition, setAlertDescrpition] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfirmTxt, setAlertConfirmTxt] = useState("");

  const { id, onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleJsonDownload = async () => {
    const response = await Albums.getJsonData(id);
    if (response.status === "Ok") {
      const json = JSON.stringify(response.data);
      const blob = new Blob([json], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `tags_for_album_${id}` + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose(selectedValue);
    } else {
      setAlertConfirmTxt("ok");
      setAlertDescrpition("Failed to fetch album");
      setAlertOpen(true);
    }
  };
  const handleZipDownload = () => {
    setAlertConfirmTxt("ok");
    setAlertDescrpition("Mamma mia. This work very soon™");
    setAlertOpen(true);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Download album data</DialogTitle>
      <List>
        <ListItem button onClick={handleZipDownload}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <GetAppIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Download zipped album data" />
        </ListItem>

        <ListItem autoFocus button onClick={handleJsonDownload}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <GetAppIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Download album tags" />
        </ListItem>
      </List>
      <TagifyAlertDialog
        Title={alertTitle}
        Descrpition={alertDescrpition}
        isOpen={alertOpen}
        ConfirmTxt={alertConfirmTxt}
        CancelTxt={""}
        handleClose={() => setAlertOpen(false)}
        handleConfirm={() => {
          setAlertOpen(false);
          onClose(selectedValue);
        }}
        handleCancel={() => {
          setAlertOpen(false);
          onClose(selectedValue);
        }}
      />
    </Dialog>
  );
}
