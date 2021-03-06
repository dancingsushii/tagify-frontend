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
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
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
  // footer css
  footer: {
    backgroundColor: "#dcedc8",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
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
        elevation={transparent ? 0 : undefined}
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
      <Hidden mdUp implementation="css">
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
      <Hidden smDown implementation="css">
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
// ########  #######   #######  ######## ######## ########
// ##       ##     ## ##     ##    ##    ##       ##     ##
// ##       ##     ## ##     ##    ##    ##       ##     ##
// ######   ##     ## ##     ##    ##    ######   ########
// ##       ##     ## ##     ##    ##    ##       ##   ##
// ##       ##     ## ##     ##    ##    ##       ##    ##
// ##        #######   #######     ##    ######## ##     ##
//

// TODO FOOTER PROPS
interface TagifyFooterProps {
  children: React.ReactElement;
}

function TagifyFooter(props: TagifyFooterProps) {
  const { children } = props;
  // CSS
  const classes = useStyles();
  return <footer className={classes.footer}>{children}</footer>;
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
  footer?: React.ReactElement;
  transparent?: boolean;
}

export function TagifyNavigation(props: TagifyNavigationProps) {
  const { children, drawer, appbar, footer, transparent } = props;
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

      {footer && <TagifyFooter>{footer}</TagifyFooter>}
    </div>
  );
}
