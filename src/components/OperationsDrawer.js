import React, { PureComponent } from 'react';
import uuid from 'uuid';

//material ui-general
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
//Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraftsIcon from '@material-ui/icons/Drafts';
import TrainIcon from '@material-ui/icons/Train';
import DescriptionIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/Label';
//Required for lists
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

//user generated
//import companyData from '../assets/trainslist';
import { _TRAIN_DETAILS, _CARGO_TYPES, _TRIP_LENGTHS } from '../assets/constants'
import ContractList from './ContractList';
import TrainListItem from './TrainListItem';
import { handleDrawerCloseClick } from '../assets/helpers.js'

let companyData = {trains: [], contracts: []};
const drawerWidth = 250;
const styles = theme => ({
    root: {
        // height: '100vh',
        // width: '100%',
        // backgroundImage: `url(${backgroundMap})`,
        // backroundRepeat: 'norepeat',
        // backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        // marginTop: '25px'       
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
        textAlign: 'left' ,
        padding: '20px',
        fontFamily: 'Algerian, sans-serif',
        fontSize: '24px',
        textAlign: 'center'
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
        margin: '15px',backgroundColor: '#857cad',
        '&:hover': {
            backgroundColor: '#5f5592'
        }
    },
    listSubheader: {
        fontFamily: 'Algerian, sans-serif'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    labelIcon: {
      opacity: '0.4',
      fontSize: '14px',
      marginLeft: '30px'
    },
    closeDrawerIcon: {
        textAlign: 'left'
    },
    contractDialogMain: {
        textAlign: 'center'
    },
    contractDialogPrompt: {
        fontSize: '24px'
    }
});

class OperationsDrawer extends PureComponent {
    
    constructor(props) {
        super(props);
        this.handleTrainClick=this.handleTrainClick.bind(this);
        this.handleCurrentClick=this.handleCurrentClick.bind(this);
        this.handleOfferClick=this.handleOfferClick.bind(this);
        this.handleDrawerCloseClick=this.handleDrawerCloseClick.bind(this);
        this.handleContractClick=this.handleContractClick.bind(this);
        this.handleContractDialogOpen=this.handleContractDialogOpen.bind(this);
        this.handleContractDialogClose=this.handleContractDialogClose.bind(this);
        this.handleTrainDialogOpen=this.handleTrainDialogOpen.bind(this);
        this.getContractOffer=this.getContractOffer.bind(this);
        this.getRandomCity=this.getRandomCity.bind(this);
        this.syncLocalStorage=this.syncLocalStorage.bind(this);
        this.state = {
          openTrainNested: false,
          openCurrentNested: false,
          openOfferNested: false,
          contractDialogObj: ''
        };
      }
      componentWillMount() {
        this.getContractOffer();
        //setInterval(() => getContractOffer(), 600000)
      }
      handleCurrentClick() {
        this.setState({ openCurrentNested : !this.state.openCurrentNested });
      }
      handleOfferClick() {
        this.setState({ openOfferNested : !this.state.openOfferNested });
      }
      handleTrainClick() {
        this.setState({ openTrainNested : !this.state.openTrainNested });
      }    
      handleDrawerCloseClick = () => {
        this.props.handleDrawerClose();
      };
      handleContractClick(id) {
          console.log('no handle contract click');
          
          //this.props.history.push('/trains/jennylind');
      }
      handleContractDialogOpen(contractObj) {
        this.props.routeHistory.push(`/funfactstrains/contracts/${contractObj.pathName}`);
      }
    
      handleContractDialogClose() {
        this.setState({ openContractDialog: false });
      }
      handleTrainDialogOpen(trainObj) {
        this.props.routeHistory.push(`/funfactstrains/trains/${trainObj.pathName}`);
      }
      getRandomCity() {
          const cityArr = Object.keys(_TRIP_LENGTHS);
          cityArr.push(Object.keys(_TRIP_LENGTHS['NewYork'])[0]);
            return cityArr[Math.floor(Math.random()*cityArr.length)]
        }
      getContractOffer() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        console.log('offer', companyData);
          const newCargo = _CARGO_TYPES[Math.floor(Math.random()*_CARGO_TYPES.length)].name;
          const from = this.getRandomCity();
          let to = this.getRandomCity();
          while (from===to) {
              to = this.getRandomCity();
          }
          
          const newContract = {
              id: uuid(),
              pathName: uuid(),              
              from: from,
              to: to,
              cargo: newCargo,
              units: 1,
              status: 'offered'
          }
          companyData.contracts.push(newContract);
          this.syncLocalStorage();
      }
      syncLocalStorage() {
        localStorage.setItem(
            'companyData', 
            JSON.stringify(companyData))
        ;
    }
    render() { 
        const { classes } = this.props;      
        const contracts = companyData.contracts;
        const currentContracts = contracts.
            filter(contract => contract.status === 'accepted' || contract.status === 'started').
            map(acceptedContract => 
                <ListItem  
                    key={acceptedContract.id} 
                    className={classes.nested}
                    button
                    onClick={this.handleClick}
                >             
                    <ListItemIcon>
                        <LabelIcon className={classes.labelIcon}/>
                    </ListItemIcon>
                    <ContractList contractObj={acceptedContract} handleContractDialogOpen={this.handleContractDialogOpen} 
                     listView/>
                </ListItem>
            )
        ;
        const offers = contracts.
            filter(contract => contract.status === 'offered').
            map(offerContract => 
                <ListItem  
                    key={offerContract.id} 
                    className={classes.nested}
                    button
                    onClick={this.handleClick}
                >             
                    <ListItemIcon>
                        <LabelIcon className={classes.labelIcon}/>
                    </ListItemIcon>
                    <ContractList 
                        contractObj={offerContract} 
                        handleContractDialogOpen={this.handleContractDialogOpen} 
                     />
                </ListItem>
            )
        ;

        const trainListItems = _TRAIN_DETAILS.map(train =>  
            <ListItem  
                    key={train.id} 
                    className={classes.nested}
                    button
                    onClick={this.handleClick}
                >             
                    <ListItemIcon>
                        <LabelIcon className={classes.labelIcon}/>
                    </ListItemIcon>
                    <TrainListItem trainObj={train} handleTrainDialogOpen={this.handleTrainDialogOpen} 
                     listView/>
                </ListItem>
        );
       
        return ( 
            <div>
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={true}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                <div className={classes.closeDrawerIcon}>
                    <IconButton onClick={this.handleDrawerCloseClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <div className={classes.container}>              
                    <Divider />
                    <Typography 
                        variant='h4' 
                        className={classes.drawerHeader} 
                        gutterBottom
                    >
                        What's your move?
                    </Typography>
                    <div className={classes.buttons}>
                    <Button
                        key={uuid()}
                        variant='contained'
                        className={classes.button}
                        color='secondary'
                        onClick={this.handleContractClick}
                    >
                        Build Route
                    </Button>
                    <Button
                        key={uuid()}
                        variant='contained'
                        className={classes.button}
                        color='primary'
                    >
                        Buy Train
                    </Button>
                    
                    <Divider />
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <h3 className={classes.listSubheader}>Current Operations</h3>
                        </ListSubheader>
                        }
                        className={classes.drawerPaper}
                    >
                        <ListItem button onClick={this.handleCurrentClick}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Current Contracts" />
                            {this.state.openCurrentNested ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.openCurrentNested} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {currentContracts}
                            </List>
                        </Collapse>
                        <ListItem button onClick={this.handleOfferClick}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contract Offers" />
                            {this.state.openOfferNested ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.openOfferNested} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {offers}
                            </List>
                        </Collapse>
                        <ListItem button onClick={this.handleTrainClick}>
                        <ListItemIcon>
                            <TrainIcon />
                        </ListItemIcon>
                        <ListItemText primary="Company Owned Trains" />
                        {this.state.openTrainNested ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        
                        <Collapse in={this.state.openTrainNested} timeout="auto" unmountOnExit>
                        
                        <List component="div" disablePadding>                
                            {trainListItems}
                        </List>
                        </Collapse>
                    </List>

                    <Divider />
                    </div>
                </div>
                </Drawer>
            </div>
        );
    }
}
 
export default withStyles(styles)(OperationsDrawer);