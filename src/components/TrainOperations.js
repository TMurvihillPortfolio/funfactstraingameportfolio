import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import backgroundMap from '../img/usmap1930NewYorkChicagowNames.jpg';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavBar from './NavBar';
import OperationsDrawer from './OperationsDrawer';
import StatusWindow from './StatusWindow';

const drawerWidth = 250;
const styles = theme => ({
    root: {
        height: '900px',
        backgroundImage: `url(${backgroundMap})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        marginTop: '25px',
        position: 'relative',
        //marginBottom: '25px'      
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
        marginLeft: drawerWidth-100,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: '35px',
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
        margin: '20px',
        backgroundColor: '#857cad',
        '&:hover': {
            backgroundColor: '#5f5592'
        }
    },
    drawHeader: {
        padding: '20px'
    },
    TrainOperationsHeaderOpen: {
        color: '#a74227',
        backgroundColor: '#c79382',
        fontFamily: 'algerian, sans-serif',
        fontSize: '36px',
        width: `calc(60% - ${drawerWidth}px)`,
        marginLeft: drawerWidth + 225,
        marginTop: 0,
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
    this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
    this.handleDrawerClose=this.handleDrawerClose.bind(this);
    this.state = {
      open: true    
    };
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  
  render() {
    // function trainY() = {
    //   setInterval => 
    // } 
    const { classes } = this.props;
    const { open, trainRight1, trainTop1, trainRight2, trainTop2 } = this.state;
        
    //const top = '700px';
    //const right = '700px';
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
          <NavBar />
        </Toolbar>
      </AppBar>
        {open ? <OperationsDrawer routeHistory={this.props.history} handleDrawerClose={this.handleDrawerClose}/> : ''}
        <div className={classes.root}>
            <h1 className={open?classes.TrainOperationsHeaderOpen:classes.TrainOperationsHeaderOpenClosed}>Train Operations</h1>            
            <StatusWindow key='001'/>
        </div> 
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(TrainOperations);