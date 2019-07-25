import React, { Component } from 'react';
//Required for lists
import ListSubheader from '@material-ui/core/ListSubheader';
import TrainIcon from '@material-ui/icons/Train';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class DrawerList extends Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state = { 
            openBuyTrainNested: false,
         }
    }
    handleClick() {
        //companyData = JSON.parse(localStorage.getItem('companyData'));
        this.setState({ openNested : !this.state.openNested });
    }
    render() {
        return ( 
            <div>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        {this.props.listIcon}
                    </ListItemIcon>
                    <ListItemText primary={this.props.listTitle} />
                    {this.state.openNested ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                    
                <Collapse in={this.state.openNested} timeout="auto" unmountOnExit>
                
                <List component="div" disablePadding onClick={this.handleBuyTrainClick}>                
                    {this.props.listItems}
                </List>
                </Collapse>
            </div>
         );
    }
}
 
export default DrawerList;