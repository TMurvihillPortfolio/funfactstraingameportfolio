import React, { PureComponent } from "react";
import styles from '../styles/TrainOperationsStyles';
//material-ui imports
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//coder created
import NavBar from './NavBar';
import OperationsDrawer from './OperationsDrawer';
import StatusWindow from './StatusWindow';
import { getContractOffer } from '../assets/helpers';

let companyData = {trains: [], contracts: []};

class TrainOperations extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
    this.handleDrawerClose=this.handleDrawerClose.bind(this);
    this.state = {
      open: true,
      companyData: localStorage.getItem('companyData') || {trains: [], contracts: []}    
    };
  }
  componentWillMount() {
    companyData = JSON.parse(localStorage.getItem('companyData'));
    getContractOffer(companyData);
    setInterval(() => getContractOffer(), 180000)
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