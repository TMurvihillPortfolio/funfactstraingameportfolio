import React, { PureComponent } from 'react';

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

//Required for Dialogs
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//user generated
import companyData from '../assets/trainslist';
import Contract from './Contract';

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
        this.state = {
          openTrainNested: false,
          openCurrentNested: true,
          openOfferNested: false,
          openContractDialog: false,
          contractDialogObj: ''
        };
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
        this.setState({ openContractDialog : true, contractDialogObj : contractObj });
        console.log(contractObj);
      }
    
      handleContractDialogClose() {
        this.setState({ openContractDialog: false });
      }
    
    render() { 
        const { classes } = this.props;        
        const contracts = companyData[0].contracts;
        const currentContracts = contracts.
            filter(contract => contract.accepted === 'true').
            map(contract => 
                <ListItem  
                    key={contract.id} 
                    className={classes.nested}
                    button
                    onClick={this.handleClick}
                >             
                    <ListItemIcon>
                        <LabelIcon className={classes.labelIcon}/>
                    </ListItemIcon>
                    <Contract contractObj={contract} handleContractDialogOpen={this.handleContractDialogOpen} 
                     listView/>
                </ListItem>
            )
        ;
        const offers = contracts.
            filter(contract => contract.accepted === 'false').
            map(contract => 
                <ListItem  
                    key={contract.id} 
                    className={classes.nested}
                    button 
                    onClick={this.handleContractClick}
                >             
                    <ListItemIcon>
                        <LabelIcon className={classes.labelIcon}/>
                    </ListItemIcon>
                    <Contract contractObj={contract} handleContractClick = {this.handleContractClick} listView/>
                </ListItem>
            )
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
                    <div className={classes.buttons}>
                    <Button
                        variant='contained'
                        className={classes.button}
                        color='secondary'
                        onClick={this.handleContractClick}
                    >
                        Build Route
                    </Button>
                    <Button
                        variant='contained'
                        className={classes.button}
                        color='primary'
                    >
                        Buy Train
                    </Button>
                    <Button
                        variant='contained'
                        className={classes.button}
                        color='primary'
                    >
                        View My Contracts
                    </Button>
                    <Button
                        variant='contained'
                        className={classes.button}
                        color='primary'
                    >
                        View Contract Offers
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
                        <ListItem button handleClick={this.handleContractDialogOpen}>
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
                            <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LabelIcon className={classes.labelIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Train Item 1" />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LabelIcon className={classes.labelIcon} />
                            </ListItemIcon>
                            <ListItemText primary="Train Item 2" />
                            </ListItem>
                        </List>
                        </Collapse>
                    </List>

                    <Divider />
                    </div>
                </div>
                </Drawer>

            
                <Button variant="outlined" color="primary" onClick={this.handleContractDialogOpen}>
                    Open form dialog
                </Button>
                <Dialog open={this.state.openContractDialog} onClose={this.handleContractDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.state.contractDialogObj.from}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleContractDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleContractDialogClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
 
export default withStyles(styles)(OperationsDrawer);