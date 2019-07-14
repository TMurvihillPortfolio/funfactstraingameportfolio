import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TrainInfoCard from "./TrainInfoCard";
import trainsList from '../assets/trainslist';
import backgroundMap from '../img/usmap1930NewYorkChicagowNames.jpg';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ContractList from './ContractList';
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
        this.state = {
          openTrainNested: false,
          openCurrentNested: false,
          openOfferNested: false
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
    
    render() { 
        const { classes } = this.props;
        const { open } = this.state
        return ( 
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
                    <ListItem button onClick={this.handleCurrentClick}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current Contracts" />
                    {this.state.openCurrentNested ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openCurrentNested} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <LabelIcon className={classes.labelIcon}/>
                        </ListItemIcon>
                        <ListItemText primary="Current Item 1" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <LabelIcon className={classes.labelIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Current Item 2" />
                        </ListItem>
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
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <LabelIcon className={classes.labelIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Offer Item 1" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <LabelIcon className={classes.labelIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Offer Item 2" />
                        </ListItem>
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

                <ContractList />
                </div>
            </div>
            </Drawer>
        );
    }
}
 
export default withStyles(styles)(OperationsDrawer);