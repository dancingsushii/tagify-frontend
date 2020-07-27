import React, { Component, MouseEvent, TouchEvent } from 'react';

import { Chip, IconButton, Menu, MenuItem } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

//=============================================================================
// ___  ____ ____ _ _  _ _ ___ _ ____ _  _ ____
// |  \ |___ |___ | |\ | |  |  | |  | |\ | [__
// |__/ |___ |    | | \| |  |  | |__| | \| ___]

interface RegionGeometry {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

enum Pole {
  NE = "ne",
  NW = "nw",
  SE = "se",
  SW = "sw",
}

//=============================================================================
// _  _ ____ _    ___  ____ ____
// |__| |___ |    |__] |___ |__/
// |  | |___ |___ |    |___ |  \

/**
 * This function extracts the pointer position relative
 * to page from a Touch- or MouseEvent.
 * @param event Event to extract position from
 */
function getMouseTouchPosition(event: any): { x: number; y: number } {
  let x: number, y: number;
  if (event.touches) {
    x = event.touches[0].pageX;
    y = event.touches[0].pageY;
  } else if (event.pageX && event.pageY) {
    x = event.pageX;
    y = event.pageY;
  } else {
    throw new Error(
      "Error: passed event is not of type" +
        "React.TouchEvent or React.MouseEvent"
    );
  }
  return { x, y };
}

/**
 * This function calculates the offset of a given element
 * to the top and left zero positions of the page.
 * @param element Element to calculate offset of
 */
function getElementOffset(
  element: React.RefObject<HTMLElement>
): { top: number; left: number } {
  if (!element.current)
    throw new Error("Error: current of RefObject is undefined");
  let rect = element.current.getBoundingClientRect();
  let doc = document.documentElement;
  let top = rect.top + window.pageYOffset - doc.clientTop;
  let left = rect.left + window.pageXOffset - doc.clientLeft;
  return { top, left };
}

/**
 * Returns ready-to-apply style object for resize
 * handles. Keep in mind to add `position: "absolute"`
 * manually by yourself.
 * @param pole Corner in which handle should spawn
 * @param size Size of handle
 */
function getResizeHandleStyle(
  pole: Pole,
  size: number
): {
  // position: "absolute";
  outline: string;
  border: string;
  width: number;
  height: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
} {
  let style = {
    // position: "absolute",
    outline: "1px solid rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.5)",
    width: size,
    height: size,
    cursor: `${pole}-resize`,
  };
  let pos = -(size / 2);
  switch (pole) {
    case Pole.NE:
      Object.assign(style, { top: pos, right: pos });
      break;
    case Pole.NW:
      Object.assign(style, { top: pos, left: pos });
      break;
    case Pole.SE:
      Object.assign(style, { bottom: pos, right: pos });
      break;
    case Pole.SW:
      Object.assign(style, { bottom: pos, left: pos });
      break;
  }
  return style;
}

//=============================================================================
// ____ ____ ____ _ ____ _  _
// |__/ |___ | __ | |  | |\ |
// |  \ |___ |__] | |__| | \|

class Region extends Component {
  props: {
    container: React.RefObject<HTMLElement>;
    geometry: RegionGeometry;
    labels: Array<string>;
    selectedLabel: string;
    onRemove: () => void;
    onUpdate: (geometry: RegionGeometry) => void;
    onSelectLabel: (label: string) => void;
    rest?: any;
  };
  panningOffset:
    | {
        x: number;
        y: number;
      }
    | undefined;
  resizePole: Pole | undefined;
  state: {
    anchorEl: any;
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.onMouseTouchDown = this.onMouseTouchDown.bind(this);
    this.onMouseTouchDownHandle = this.onMouseTouchDownHandle.bind(this);
    this.onMouseTouchMove = this.onMouseTouchMove.bind(this);
    this.onMouseTouchUp = this.onMouseTouchUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.panningOffset = undefined;
    this.resizePole = undefined;
    this.state = { anchorEl: undefined };
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.onMouseTouchMove);
    document.addEventListener("touchmove", this.onMouseTouchMove);
    document.addEventListener("mouseup", this.onMouseTouchUp);
    document.addEventListener("touchend", this.onMouseTouchUp);
    document.addEventListener("touchcancel", this.onMouseTouchUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseTouchMove);
    document.removeEventListener("touchmove", this.onMouseTouchMove);
    document.removeEventListener("mouseup", this.onMouseTouchUp);
    document.removeEventListener("touchend", this.onMouseTouchUp);
    document.removeEventListener("touchcancel", this.onMouseTouchUp);
  }

  onMouseTouchDown(event: any) {
    event.preventDefault();
    // if is middle click -> remove region; return;
    if (event.button && event.button === 1) {
      this.props.onRemove();
      return;
    }
    // if not touch or leftclick -> return;
    if (event.button && event.button !== 0) return;

    let { x, y } = getMouseTouchPosition(event);
    let { top, left } = getElementOffset(this.props.container);

    this.panningOffset = {
      x: x - left - this.props.geometry.left,
      y: y - top - this.props.geometry.top,
    };
  }

  onMouseTouchDownHandle(pole: Pole, event: any) {
    // if is middle click -> remove region; return;
    if (event.button && event.button === 1) {
      this.props.onRemove();
      return;
    }
    if (event.button && event.button !== 0) return;
    this.resizePole = pole;
  }

  onMouseTouchMove(event) {
    if (!this.panningOffset && !this.resizePole) return;

    let { x, y } = getMouseTouchPosition(event);
    let { top, left } = getElementOffset(this.props.container);

    let geo = this.props.geometry;
    let newX = x - left;
    let newY = y - top;
    if (this.panningOffset) {
      let newLeft = newX - this.panningOffset.x;
      let newTop = newY - this.panningOffset.y;

      geo.left = newLeft;
      geo.right = newLeft + geo.width;
      geo.top = newTop;
      geo.bottom = newTop + geo.height;
    }

    let match = true;
    switch (this.resizePole) {
      case Pole.NE:
        geo.top = newY < geo.bottom ? newY : geo.bottom;
        geo.right = newX > geo.left ? newX : geo.left;
        break;
      case Pole.NW:
        geo.top = newY < geo.bottom ? newY : geo.bottom;
        geo.left = newX < geo.right ? newX : geo.right;
        break;
      case Pole.SE:
        geo.bottom = newY > geo.top ? newY : geo.top;
        geo.right = newX > geo.left ? newX : geo.left;
        break;
      case Pole.SW:
        geo.bottom = newY > geo.top ? newY : geo.top;
        geo.left = newX < geo.right ? newX : geo.right;
        break;
      default:
        match = false;
    }
    if (match) {
      geo.width = geo.right - geo.left;
      geo.height = geo.bottom - geo.top;
    }

    this.props.onUpdate(geo);
  }

  onMouseTouchUp(event) {
    this.panningOffset = undefined;
    this.resizePole = undefined;
  }

  handleClick(event) {
    this.state.anchorEl = event.currentTarget;
    this.setState(this.state);
  }

  handleClose(label: any) {
    this.state.anchorEl = undefined;
    if (typeof label === "string") this.props.onSelectLabel(label);
    this.setState(this.state);
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          border: "1px dashed rgba(0,0,0,0.5)",
          outline: "1px dashed rgba(255,255,255,0.5)",
          cursor: "move",
          width: this.props.geometry.width,
          height: this.props.geometry.height,
          top: this.props.geometry.top,
          left: this.props.geometry.left,
        }}
      >
        {/* ======================== Tag Selector ======================== */}
        <div style={{ position: "absolute", top: 0, right: 27 }}>
          <Chip
            size="small"
            label={this.props.selectedLabel}
            onClick={this.handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            {this.props.labels.map((label) => (
              <MenuItem
                key={label}
                dense={true}
                onClick={this.handleClose.bind(null, label)}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </div>
        {/* ======================== Remove Button ======================= */}
        <div style={{ position: "absolute", top: 0, right: 10 }}>
          <IconButton size="small" onClick={this.props.onRemove}>
            <DeleteForeverIcon
              style={{ position: "absolute" }}
              fontSize="inherit"
            />
          </IconButton>
        </div>
        {/* ======================= Resize Handles ======================= */}
        {[Pole.NE, Pole.NW, Pole.SE, Pole.SW].map((pole) => (
          <div
            onTouchStart={this.onMouseTouchDownHandle.bind(null, pole)}
            onMouseDown={this.onMouseTouchDownHandle.bind(null, pole)}
            key={pole}
            style={{
              position: "absolute",
              ...getResizeHandleStyle(pole, 8),
            }}
          />
        ))}
        {/* ======================= Panning Handler ====================== */}
        <div
          onTouchStart={this.onMouseTouchDown}
          onMouseDown={this.onMouseTouchDown}
          style={{
            width: this.props.geometry.width,
            height: this.props.geometry.height,
            top: this.props.geometry.top,
            left: this.props.geometry.left,
          }}
        />
      </div>
    );
  }
}

//=============================================================================
// ____ _  _ _  _ ____ ___ ____ ___ ____ ____
// |__| |\ | |\ | |  |  |  |__|  |  |  | |__/
// |  | | \| | \| |__|  |  |  |  |  |__| |  \

export default class Annotator extends Component {
  container: React.RefObject<HTMLDivElement>;
  isDown: boolean;
  state: {
    regions: Array<{
      geometry: RegionGeometry;
      xGrow: boolean;
      yGrow: boolean;
      selectedLabel: string;
    }>;
    rest?: any;
  };

  constructor(props) {
    super(props);
    this.onMouseTouchDown = this.onMouseTouchDown.bind(this);
    this.onMouseTouchMove = this.onMouseTouchMove.bind(this);
    this.onMouseTouchUp = this.onMouseTouchUp.bind(this);
    this.onRemoveRegion = this.onRemoveRegion.bind(this);
    this.onUpdateRegion = this.onUpdateRegion.bind(this);
    this.onSelectLabel = this.onSelectLabel.bind(this);
    this.container = React.createRef();
    this.isDown = false;
    this.state = { regions: [] };
  }

  componentDidMount() {
    // document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    // document.body.style.overflow = "visible";
  }

  onMouseTouchDown(event: any) {
    // if not touch or leftclick -> return;
    if (event.button && event.button !== 0) return;
    // if pinch -> return;
    if (event.touches && event.touches.length > 1) return;
    event.preventDefault();
    let { x, y } = getMouseTouchPosition(event);
    let { top, left } = getElementOffset(this.container);

    this.state.regions.push({
      geometry: {
        top: y - top,
        bottom: y - top,
        left: x - left,
        right: x - left,
        width: 0,
        height: 0,
      },
      xGrow: true,
      yGrow: true,
      selectedLabel: "Default",
    });

    this.setState(this.state);
    this.isDown = true;
  }

  onMouseTouchMove(event: any) {
    if (!this.isDown) return;
    if (event.touches && event.touches.length > 1) {
      this.isDown = false;
      this.state.regions.splice(this.state.regions.length - 1, 1);
      this.setState(this.state);
      return;
    }
    let { x, y } = getMouseTouchPosition(event);
    let { top, left } = getElementOffset(this.container);

    let region = this.state.regions[this.state.regions.length - 1];
    let geo = region.geometry;
    let newX = x - left;
    let newY = y - top;
    let isXGrow = newX - (region.xGrow ? geo.left : geo.right) >= 0;
    let isYGrow = newY - (region.yGrow ? geo.top : geo.bottom) >= 0;

    region.xGrow = isXGrow;
    if (!isXGrow) geo.left = newX;
    if (isXGrow) geo.right = newX;
    geo.width = geo.right - geo.left;

    region.yGrow = isYGrow;
    if (!isYGrow) geo.top = newY;
    if (isYGrow) geo.bottom = newY;
    geo.height = geo.bottom - geo.top;

    this.setState(this.state);
  }

  onMouseTouchUp(
    event: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) {
    this.isDown = false;
  }

  /**
   * Removes region at given index from state.
   * @param index Index to be removed
   */
  onRemoveRegion(index: number) {
    this.state.regions.splice(index, 1);
    this.setState(this.state);
  }

  /**
   * Updates geometry of region at given index.
   * @param index Index of region to update
   * @param geometry New geometry
   */
  onUpdateRegion(index: number, geometry: RegionGeometry) {
    this.state.regions[index].geometry = geometry;
    this.setState(this.state);
  }

  onSelectLabel(index: number, label: string) {
    this.state.regions[index].selectedLabel = label;
    this.setState(this.state);
  }

  render() {
    return (
      <div
        ref={this.container}
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
        }}
        onTouchMove={this.onMouseTouchMove}
        onMouseMove={this.onMouseTouchMove}
        onTouchEnd={this.onMouseTouchUp}
        onTouchCancel={this.onMouseTouchUp}
        onMouseUp={this.onMouseTouchUp}
        onMouseLeave={this.onMouseTouchUp}
      >
        {this.state.regions.map((val, i) => (
          <Region
            key={i}
            container={this.container}
            geometry={val.geometry}
            selectedLabel={val.selectedLabel}
            labels={["1", "2", "3"]}
            onRemove={this.onRemoveRegion.bind(null, i)}
            onUpdate={this.onUpdateRegion.bind(null, i)}
            onSelectLabel={this.onSelectLabel.bind(null, i)}
          />
        ))}
        <div
          onTouchStart={this.onMouseTouchDown}
          onMouseDown={this.onMouseTouchDown}
        >
          <img src="/api/user/albums/4/photos/35" height={350} width={350} />
        </div>
      </div>
    );
  }
}
