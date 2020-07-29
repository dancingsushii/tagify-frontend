import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Chip, Container, Typography } from '@material-ui/core';

import {
    AlbumInformation, Albums, EmptyAlbumInformation, Status, TagPhotoInformation, UserTag
} from '../../utils/BackendAPI';
import Annotator, { ImageSize, RegionGeometry } from '../snippets/Annotator';

function Separator(props: { size?: number }) {
  let DEFAULT = { size: 10 };
  let { size } = { ...DEFAULT, ...props };
  return <div style={{ marginRight: size }} />;
}

export default class AnnotationPage extends Component {
  albumId: string;
  imageSize: ImageSize;
  album: AlbumInformation;
  images: Array<TagPhotoInformation>;
  state: {
    regions: Array<{
      geometry: RegionGeometry;
      xGrow: boolean;
      yGrow: boolean;
      selectedLabel: string;
    }>;
    render: boolean;
    error?: string;
    currentImage: number;
    currentLabel: string;
  };

  constructor(props) {
    super(props);
    this.onLabelSelect = this.onLabelSelect.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReject = this.onReject.bind(this);
    this.loadCurrentRegions = this.loadCurrentRegions.bind(this);
    this.albumId = props.match.params.id;
    this.imageSize = { width: 0, height: 0 };
    this.album = EmptyAlbumInformation;
    this.images = [];
    this.state = {
      render: false,
      currentImage: 0,
      currentLabel: "",
      regions: [],
    };
  }

  async componentWillMount() {
    let response1 = await Albums.getAlbum(this.albumId);
    if (response1.status === Status.Ok || response1.data) {
      this.album = response1.data;
      this.state.currentLabel = this.album.tags[0];
    } else {
      this.state.error = "Failed to fetch album data. We are working on it ...";
    }
    let response2 = await UserTag.getLockPhotos(this.albumId);
    if (response2.status === Status.Ok || response2.data) {
      this.images = response2.data;
      if (!this.state.error && this.images.length === 0) {
        this.state.error =
          "Album is already completely tagged. Or some other user(s) are " +
          "currently tagging the last few photos. :)";
      }
    } else if (!this.state.error) {
      this.state.error =
        "Failed to fetch pictures for tagging/validation. We are working on it ...";
    }
    this.state.render = true;
    if (!this.state.error) this.loadCurrentRegions();
    this.setState(this.state);
  }

  onLabelSelect(label: string) {
    this.state.currentLabel = label;
    this.setState(this.state);
  }

  loadCurrentRegions() {
    let img = this.images[this.state.currentImage];
    if (img.tagged) {
      this.state.regions = JSON.parse(img.coordinates);
    } else {
      this.state.regions = [];
    }
    this.setState(this.state);
  }

  onSubmit() {
    let img = this.images[this.state.currentImage];
    if (img.tagged) {
      UserTag.verifyPhoto(img.id.toString(), { verified: true });
    } else {
      let tags = this.state.regions.map((region) => region.selectedLabel);
      tags = tags.filter((v, i) => tags.indexOf(v) === i);
      UserTag.tagPhoto(img.id.toString(), {
        tag: tags.join(","),
        coordinates: JSON.stringify(this.state.regions),
      });
    }
    this.onNext();
  }

  onReject() {
    let img = this.images[this.state.currentImage];
    UserTag.verifyPhoto(img.id.toString(), { verified: false });
    this.onNext();
  }

  onNext() {
    this.state.currentImage++;
    if (this.state.currentImage == this.images.length) {
      this.state.error = "You are done! :)";
    } else {
      this.loadCurrentRegions();
    }
    this.setState(this.state);
  }

  onRegionChange(
    regions: Array<{
      geometry: RegionGeometry;
      xGrow: boolean;
      yGrow: boolean;
      selectedLabel: string;
    }>
  ) {
    this.state.regions = regions;
    this.setState(this.state);
  }

  render() {
    return (
      <>
        {!this.state.error && this.state.render && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Typography variant="h5">{this.album?.title}</Typography>
              <Separator />
              {this.album?.tags.map((tag) => (
                <Chip
                  key={tag}
                  style={{ marginRight: 5 }}
                  label={tag}
                  onClick={this.onLabelSelect.bind(null, tag)}
                />
              ))}
              <div style={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={this.onNext}
              >
                Skip
              </Button>
              <Separator />
              {this.images[this.state.currentImage].tagged && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={this.onReject}
                  >
                    Reject
                  </Button>
                  <Separator />
                </>
              )}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={this.onSubmit}
              >
                {this.images[this.state.currentImage].tagged
                  ? "Verify"
                  : "Next"}
              </Button>
            </div>
            <Annotator
              image={`/api/user/albums/${this.albumId}/photos/${
                this.images[this.state.currentImage].id
              }`}
              regions={this.state.regions}
              currentLabel={this.state.currentLabel}
              labels={this.album.tags}
              onImageLoaded={(imageSize) => {
                this.imageSize = imageSize;
              }}
              onChange={this.onRegionChange}
              immutable={this.images[this.state.currentImage].tagged}
            />
          </>
        )}
        {this.state.error && (
          <Container style={{ textAlign: "center", marginTop: "6em" }}>
            <Typography variant="h2">Oops</Typography>
            <Box component="div" style={{ marginTop: "1em" }}>
              {this.state.error}
            </Box>
            <Button
              style={{ marginTop: "1em" }}
              variant="contained"
              color="primary"
              disableElevation
              component={Link}
              to="/"
            >
              Back to Dashboard
            </Button>
          </Container>
        )}
      </>
    );
  }
}
