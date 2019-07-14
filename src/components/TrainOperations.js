import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TrainInfoCard from "./TrainInfoCard";
import trainsList from '../assets/trainslist';
import backgroundMap from '../img/usmap1930NewYorkChicagowNames.jpg';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavBar from './NavBar';
import trainOnMap from '../img/TrainForMap.png';
import ContractList from './ContractList';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import TrainIcon from '@material-ui/icons/Train';
import DescriptionIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/Label';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import OperationsDrawer from './OperationsDrawer';

const drawerWidth = 250;
const styles = theme => ({
    root: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${backgroundMap})`,
        backroundRepeat: 'norepeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        marginTop: '25px'       
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#a74227'
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth+50}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
    TrainOperations: {
        
    },
    drawer: {
        width: `${drawerWidth}px`,
        overflow: 'hidden',
        padding: '20px'
    },
    drawerHeader: {
        textAlign: 'left'  
    },
    drawerPaper: {
        background: "#fbF6d2"
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        color: '#f3f2fa',
        margin: '20px',backgroundColor: '#857cad',
        '&:hover': {
            backgroundColor: '#5f5592'
        }
    },
    drawHeader: {
        padding: '20px'
    },
    TrainOperationsHeader: {
        color: '#a74227',
        backgroundColor: '#c79382',
        fontFamily: 'algerian, sans-serif',
        fontSize: '36px',
        width: '60%',
        margin: 'auto',
        marginTop: '0',
        borderRadius: '7px',
    },
    
    nested: {
      paddingLeft: theme.spacing(4),
    },
    labelIcon: {
      opacity: '0.4',
      fontSize: '14px',
      marginLeft: '30px'
    }
});

class TrainOperations extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this);
    this.handleCurrentClick=this.handleCurrentClick.bind(this);
    this.handleOfferClick=this.handleOfferClick.bind(this);
    this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
    this.handleDrawerClose=this.handleDrawerClose.bind(this);
    this.state = {
      open: true,
      openNested: true,
      openCurrentNested: true,
      openOfferNested: true,
      setOpen: true
    };
  }

  handleClick() {
    this.setState({ openNested : !this.state.openNested });
  }
  handleCurrentClick() {
    this.setState({ openCurrentNested : !this.state.openCurrentNested });
  }
  handleOfferClick() {
    this.setState({ openOfferNested : !this.state.openOfferNested });
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.drawerContainer}>
        <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography> */}
          <NavBar />
        </Toolbar>
      </AppBar>
        <OperationsDrawer />
        <div className={classes.root}>
            <h1 className={classes.TrainOperationsHeader}>Train Operations</h1>
            <img src={trainOnMap} style={{height: '25px', position: 'fixed', top:'50%'}}/>
        </div> 
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(TrainOperations);