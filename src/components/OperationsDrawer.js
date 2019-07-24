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
import { _TRAIN_DETAILS } from '../assets/constants';
import ContractList from './ContractList';
import TrainListItem from './TrainListItem';

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
        //handle list/drawer open/close clicks
        this.handleDrawerCloseClick=this.handleDrawerCloseClick.bind(this);
        this.handleTrainClick=this.handleTrainClick.bind(this);
        this.handleBuyTrainClick=this.handleBuyTrainClick.bind(this);
        this.handleCurrentClick=this.handleCurrentClick.bind(this);
        this.handleOfferClick=this.handleOfferClick.bind(this);
        //handle button/list-item clicks
        this.handleBuildClick=this.handleBuildClick.bind(this);    
        this.handleContractListItemClick=this.handleContractListItemClick.bind(this);
        this.handleTrainListItemClick=this.handleTrainListItemClick.bind(this);       
        
        //data handling
        this.syncLocalStorage=this.syncLocalStorage.bind(this);
        
        this.state = {
          openBuyTrainNested: false,
          openTrainNested: false,
          openCurrentNested: false,
          openOfferNested: false
        };
    }

    //***handle list/drawer open/close clicks***//
    handleDrawerCloseClick = () => {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        this.props.handleDrawerClose();
    }
    handleBuyTrainClick() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        this.setState({ openBuyTrainNested : !this.state.openBuyTrainNested });
    }
    handleCurrentClick() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        this.setState({ openCurrentNested : !this.state.openCurrentNested });
    }
    handleOfferClick() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        this.setState({ openOfferNested : !this.state.openOfferNested });
    }
    handleTrainClick() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        this.setState({ openTrainNested : !this.state.openTrainNested });
    }    
      
    //***handle button/list-item click***/ 
    handleBuildClick() {
        this.props.routeHistory.push(`/funfactstrains/buildroute`);
    }     
    handleContractListItemClick(contractObj) {
        this.props.routeHistory.push(`/funfactstrains/contracts/${contractObj.pathName}`);
    }
    handleTrainListItemClick(trainObj) {
        this.props.routeHistory.push(`/funfactstrains/trains/${trainObj.pathName}`);
    }

    //***data updating***/
    syncLocalStorage() {
        localStorage.setItem(
            'companyData', 
            JSON.stringify(companyData))
        ;
    }
    render() { 
        companyData = JSON.parse(localStorage.getItem('companyData'));
        const { classes } = this.props;      
        const contracts = companyData.contracts;       
        const compTrains = []       
        companyData.trains.map(train => {
            _TRAIN_DETAILS.map(trainDeets => {
                if (trainDeets.trainId===train.id) {
                    compTrains.push(trainDeets);
                }
            })
        });
        const currentContracts = contracts
            .filter(contract => contract.status === 'accepted' || contract.status === 'started')
            .map(acceptedContract => 
                <ListItem  
                    key={acceptedContract.id} 
                    className={classes.nested}
                    button
                    onClick={this.handleClick}
                >             
                    <ListItemIcon>
                        <LabelIcon className={classes.labelIcon}/>
                    </ListItemIcon>
                    <ContractList contractId={acceptedContract.id} handleContractListItemClick={this.handleContractListItemClick} 
                     listView/>
                </ListItem>
            )
        ;
        const offers = contracts
            .filter(contract => contract.status === 'offered')
            .map(offerContract => 
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
                        contractId={offerContract.id} 
                        handleContractListItemClick={this.handleContractListItemClick} 
                     />
                </ListItem>
            )
        ;

        const buyTrainListItems = compTrains.map(train =>  
            <ListItem  
                key={train.id} 
                className={classes.nested}
                button
                onClick={this.handleClick}
            >             
                <ListItemIcon>
                    <LabelIcon className={classes.labelIcon}/>
                </ListItemIcon>
                <TrainListItem trainObj={train} handleTrainListItemClick={this.handleTrainListItemClick} 
                    listView/>
            </ListItem>
        );
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
                <TrainListItem trainObj={train} handleTrainListItemClick={this.handleTrainListItemClick} 
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
                        onClick={this.handleBuildClick}
                    >
                        Build Route
                    </Button>
                    <List>
                    <ListItem button onClick={this.handleBuyTrainClick}>
                        <ListItemIcon>
                            <TrainIcon />
                        </ListItemIcon>
                        <ListItemText primary="Buy/Sell Trains" />
                        {this.state.openBuyTrainNested ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        
                        <Collapse in={this.state.openBuyTrainNested} timeout="auto" unmountOnExit>
                        
                        <List component="div" disablePadding onClick={this.handleBuyTrainClick}>                
                            {trainListItems}
                        </List>
                        </Collapse>
                    </List>
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
                            {buyTrainListItems}
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