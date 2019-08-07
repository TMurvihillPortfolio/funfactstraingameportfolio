import React, { Component } from 'react';
import styles from '../styles/OperationsDrawerStyles';
import { Link } from 'react-router-dom';

//material ui-general
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
//Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraftsIcon from '@material-ui/icons/Drafts';
import DescriptionIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/Label';
import LocoIcon from '../img/locoIcon.png';
import TracksIcon from '../img/tracksIcon.png';
//Required for lists
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

//user generated
import { _TRAIN_DETAILS } from '../assets/constants';
import ContractListItem from './ContractListItem';
import TrainListItem from './TrainListItem';
import DrawerList from './DrawerList';

class OperationsDrawer extends Component {   
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
        
        this.state = {
          openBuyTrainNested: false,
          openTrainNested: false,
          openCurrentNested: false,
          openOfferNested: false
        };
    }

    //***handle list/drawer open/close clicks***//
    handleDrawerCloseClick = () => {
        this.props.handleDrawerClose();
    }
    handleBuyTrainClick() {
        this.setState({ openBuyTrainNested : !this.state.openBuyTrainNested });
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

    render() { 
        const { classes, companyData } = this.props;
        const { contracts, trains } = this.props.companyData[0];       
        const compTrains = [];
              
        if (trains !== undefined) {     
            trains.map(train => {
                _TRAIN_DETAILS.map(trainDetail => {
                    if (trainDetail.trainId===train.id) {
                        compTrains.push(trainDetail);
                    }
                })
            });
        }
        
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
                    <ContractListItem contractObj={acceptedContract} handleContractListItemClick={this.handleContractListItemClick} 
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
                    <ContractListItem 
                        contractId={offerContract.id} 
                        contractObj={offerContract}
                        handleContractListItemClick={this.handleContractListItemClick} 
                     />
                </ListItem>
            )
        ;
        const companyTrainListItems = compTrains.map(train =>  
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
        const buildRouteItems =   
            <ListItem  
                key='001' 
                className={classes.nested}
                button
                onClick={this.handleClick}
            >             
                <ListItemIcon>
                    <LabelIcon className={classes.labelIcon}/>
                </ListItemIcon>
                "Under Construction--All routes available."
            </ListItem>
        ;
        const viewMap =   
            <ListItem  
                key='001' 
                className={classes.nested}
                button
                onClick={this.handleClick}
            >             
                <ListItemIcon>
                    <LabelIcon className={classes.labelIcon}/>
                </ListItemIcon>
                <Link to="/funfactstrains/routemap/" >View Map</Link>
            </ListItem>
        ;
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
                    <div>
                        <h3>Cash: {`$${companyData[0].financials.cash}.00`}</h3>
                    </div>
                    <div className={classes.buttons}>
                    <List>
                        <DrawerList 
                            listItems={viewMap} 
                            listIcon={<img 
                                src={TracksIcon} 
                                className={classes.tracksIcon} 
                                alt='traintracks icon' />
                            } 
                            listTitle="View Map"
                        />
                        <DrawerList 
                            listItems={buildRouteItems} 
                            listIcon={<img 
                                src={TracksIcon} 
                                className={classes.tracksIcon} 
                                alt='traintracks icon' />
                            } 
                            listTitle="Build Routes"
                        />
                        <DrawerList 
                            listItems={trainListItems} 
                            listIcon={<img 
                                src={LocoIcon} 
                                className={classes.locoIcon} 
                                alt='locomotive icon' />
                            } 
                            listTitle="Buy/Sell Engines"
                        />
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
                        <DrawerList listItems={currentContracts} listIcon={<DescriptionIcon />} listTitle={`Current Contracts (${currentContracts.length})`}/>
                        <DrawerList listItems={offers} listIcon={<DraftsIcon />} listTitle={`Current Offers (${offers.length})`}/>
                        <DrawerList listItems={companyTrainListItems} listIcon={<img src={LocoIcon} className={classes.locoIcon} alt='locomotive icon' />} listTitle="Purchased Engines"/>
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