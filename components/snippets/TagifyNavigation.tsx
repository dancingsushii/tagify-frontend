import React from 'react';

import {
    AppBar, Drawer, Hidden, IconButton, makeStyles, Slide, SwipeableDrawer, Toolbar,
    useScrollTrigger, useTheme
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
}));

//
//    ###    ########  ########  ########     ###    ########
//   ## ##   ##     ## ##     ## ##     ##   ## ##   ##     ##
//  ##   ##  ##     ## ##     ## ##     ##  ##   ##  ##     ##
// ##     ## ########  ########  ########  ##     ## ########
// ######### ##        ##        ##     ## ######### ##   ##
// ##     ## ##        ##        ##     ## ##     ## ##    ##
// ##     ## ##        ##        ########  ##     ## ##     ##
//

interface TagifyAppBarProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactElement;
  transparent?: boolean;
  hasDrawer?: boolean;
  toggleDrawer?: React.ReactEventHandler<{}>;
}

function TagifyAppBar(props: TagifyAppBarProps) {
  const { children, transparent, hasDrawer, toggleDrawer } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        elevation={0}
        className={hasDrawer ? classes.appBar : undefined}
        style={{ background: transparent ? "transparent" : undefined }}
      >
        <Toolbar>
          {hasDrawer && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          {children}
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

//
// ########  ########     ###    ##      ## ######## ########
// ##     ## ##     ##   ## ##   ##  ##  ## ##       ##     ##
// ##     ## ##     ##  ##   ##  ##  ##  ## ##       ##     ##
// ##     ## ########  ##     ## ##  ##  ## ######   ########
// ##     ## ##   ##   ######### ##  ##  ## ##       ##   ##
// ##     ## ##    ##  ##     ## ##  ##  ## ##       ##    ##
// ########  ##     ## ##     ##  ###  ###  ######## ##     ##
//

interface TagifyDrawerProps {
  window?: () => Window;
  children?: React.ReactElement;
  open: boolean;
  toggle: React.ReactEventHandler<{}>;
}

function TagifyDrawer(props: TagifyDrawerProps) {
  const { window, children, open, toggle } = props;

  const classes = useStyles();
  const theme = useTheme();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={open}
          onOpen={toggle}
          onClose={toggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {children}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          {children}
        </Drawer>
      </Hidden>
    </nav>
  );
}

//
//  ######   #######  ##     ## ########   #######   ######   #######  ########
// ##    ## ##     ## ###   ### ##     ## ##     ## ##    ## ##     ## ##     ##
// ##       ##     ## #### #### ##     ## ##     ## ##       ##     ## ##     ##
// ##       ##     ## ## ### ## ########  ##     ##  ######  ##     ## ########
// ##       ##     ## ##     ## ##        ##     ##       ## ##     ## ##   ##
// ##    ## ##     ## ##     ## ##        ##     ## ##    ## ##     ## ##    ##
//  ######   #######  ##     ## ##         #######   ######   #######  ##     ##
//

interface TagifyNavigationProps {
  children: React.ReactElement;
  drawer?: React.ReactElement;
  appbar?: React.ReactElement;
  transparent?: boolean;
}

export function TagifyNavigation(props: TagifyNavigationProps) {
  const { children, drawer, appbar, transparent } = props;
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      {appbar && (
        <TagifyAppBar
          transparent={transparent}
          hasDrawer={drawer !== undefined}
          toggleDrawer={handleDrawerToggle}
        >
          {appbar}
        </TagifyAppBar>
      )}

      {drawer && (
        <TagifyDrawer open={mobileOpen} toggle={handleDrawerToggle}>
          {drawer}
        </TagifyDrawer>
      )}

      <main className={classes.content}>
        {appbar && !transparent && <div className={classes.toolbar} />}
        {children}
      </main>
    </div>
  );
}
