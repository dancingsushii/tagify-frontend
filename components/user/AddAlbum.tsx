import React from 'react';

import {
    Button, Card, CardActions, CardContent, Chip, Container, makeStyles, TextField, useTheme
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { UserAlbum } from '../../utils/BackendAPI';
import { FileSelector, FileUploader } from '../snippets/FileUtils';
import { ProgressButton } from '../snippets/ProgressButton';

export function AddAlbum() {
  const theme = useTheme();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");
  const [files, setFiles] = React.useState<FileList | Array<File>>([]);
  const [progress, setProgress] = React.useState<number>(0);
  const initalErrors = {
    name: "",
    description: "",
    tags: "",
  };
  const [errors, setErrors] = React.useState(initalErrors);
  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function validateForm(): boolean {
    setErrors(initalErrors);
    if (name.length > 0 && description.length > 0 && tags.length) {
      return true;
    } else {
      if (name.length === 0) {
        setErrors((previousState) => ({
          ...previousState,
          name: "Please input album name",
        }));
      }
      if (description.length === 0) {
        setErrors((previousState) => ({
          ...previousState,
          description: "Please input a description",
        }));
      }
      if (tags.length === 0) {
        setErrors((previousState) => ({
          ...previousState,
          tags: "Please specify tags for your album",
        }));
      }
      return false;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      UserAlbum.createNewAlbum({
        title: name,
        description: description,
        tags: tags,
      })
        .then((response) => {
          if (response.responseCode !== "Ok" || response.album === undefined) {
            alert("Failed to create new album");
            console.error(
              `Server answered with error code ${response.responseCode}`
            );
            return;
          }
          return FileUploader(
            files,
            response.album?.id.toString(),
            setProgress
          );
        })
        .then(() => {
          console.log("Finished!");
        });
    }
  }
  function removeTag(i) {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  }

  function inputKeyDown(e) {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      setInput("");
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  }

  const handleDelete = (chipToDelete: string) => () => {
    setTags((tags) => tags.filter((tag) => tag !== chipToDelete));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10),
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
    },
    taglist: {
      display: "inline-flex",
      flexWrap: "wrap",
      listStyle: "none",
      padding: 0,
    },
    listelem: {
      marginBottom: 5,
      marginRight: 5,
    },
    title: {
      fontSize: 20,
      marginTop: "1em",
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card variant="outlined">
        <form>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              Album name:
            </Typography>
            <TextField
              required
              fullWidth
              error={errors.name.length === 0 ? false : true}
              helperText={errors.name}
              size="small"
              name="title"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
            <Typography className={classes.title} gutterBottom>
              Album description:
            </Typography>
            <TextField
              required
              fullWidth
              error={errors.description.length === 0 ? false : true}
              helperText={errors.description}
              size="small"
              name="description"
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
            />
            <Typography className={classes.title} gutterBottom>
              Tags:
            </Typography>
            <TextField
              type="text"
              fullWidth
              variant="outlined"
              error={errors.tags.length === 0 ? false : true}
              helperText={errors.tags}
              value={input}
              size="small"
              placeholder="Type and press Enter"
              onChange={handleInputChange}
              onKeyDown={inputKeyDown}
            ></TextField>
            <div className={classes.tags}>
              <ul className={classes.taglist}>
                {tags.map((tag) => (
                  <li key={tag} className={classes.listelem}>
                    <Chip label={tag} onDelete={handleDelete(tag)} />
                  </li>
                ))}
              </ul>
            </div>
            <FileSelector accept={"image/*"} setFiles={setFiles}>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Select Files
              </Button>
            </FileSelector>
            <div>Total number of selected files: {files.length}</div>
          </CardContent>
          <CardActions>
            <ProgressButton
              variant="contained"
              disableElevation
              fullWidth
              onClick={handleSubmit}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
              progress={progress}
              onProgress={(p) => `${p}% uploaded`}
              onSuccess={"Successfully created!"}
              primary={theme.palette.primary.main}
              secondary={theme.palette.secondary.main}
              fadeWidth={30}
            >
              Create Album
            </ProgressButton>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
