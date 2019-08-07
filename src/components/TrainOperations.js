import React, { PureComponent } from "react";
import styles from '../styles/TrainOperationsStyles';
import '../css/GetPassengersCSS.css';
//material-ui imports
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//coder created
import NavBar from './NavBar';
import OperationsDrawer from './OperationsDrawer';
import StatusWindow from './StatusWindow';
import { _INITIAL_COMPANYDATA } from '../assets/constants';

class TrainOperations extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
    this.handleDrawerClose=this.handleDrawerClose.bind(this);
    this.handlePassengerClick=this.handlePassengerClick.bind(this);
    this.state = {
      open: true
    };
  }
  componentDidMount() {
    const goal = document.querySelector('#goal');
    if (this.props.companyData[0].financials.cash >= 2000) {
      goal.innerText='WINNER, WINNER, $2000 reached!!';
    }
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handlePassengerClick() {
    document.querySelector('#reward').style.display = 'block';
    //document.querySelector('#amount').style.transform = 'scale(2.0)';
    setTimeout(() => {
        document.querySelector('#reward').style.display = 'none';
        //document.querySelector('#amount').style.transform = 'scale(1.0)';
        this.props.getPassengerReward();
    }, 8000);
  }
  render() { 
    const { classes, companyData, activeTrains } = this.props;
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
              <ChevronRightIcon />
              <p style={{ fontSize: '12px'}}>Train Operations</p>
            </IconButton>
            <NavBar />
          </Toolbar>
        </AppBar>
        {open ? <OperationsDrawer routeHistory={this.props.history} handleDrawerClose={this.handleDrawerClose} companyData={companyData}/> : ''}
        <div className={classes.root}>
          <div className={classes.goal} id="goal">Earn $2000 to win game!!</div>
            <StatusWindow 
              activeTrains={activeTrains} 
              companyData={this.props.companyData} 
              updateActiveTrains={this.props.updateActiveTrains} 
              updateCompanyData={this.props.updateCompanyData}
            />
        </div>         
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(TrainOperations);