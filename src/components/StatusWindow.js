import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import companyData from '../assets/trainslist';
import ActiveTrain from './ActiveTrain';

const styles = {
    root: {
        height: '200px',
        width: '400px',
        position: 'fixed',
        bottom: 0,
        right: 0,
        border: '7px double #a74227',
        borderRadius: '10px',
        backgroundImage: 'linear-gradient(rgba(250,244,216,.8), rgba(250,244,216,.8))'
    },
    list: {
        listStyle: 'none'
    }
}
class StatusWindow extends Component {
    constructor(props) {
        super(props);
        this.updatePositions=this.updatePositions.bind(this);   
        this.state = { 
            right: 100
         }
    }
    updatePositions() {
        this.setState({ right : this.state.right+1 });       
    }
    render() { 
        const {classes} = this.props;
        const activeTrains = companyData[0].activeTrains.map(train => <li><ActiveTrain right={this.state.right} updatePositions={this.updatePositions}/></li>);
        console.log(activeTrains);
        console.log(companyData[0].activeTrains[0].id);
        return ( 
            <div>
                <div className={classes.root}> <h4>Active Trains</h4>
                    <ul className={classes.list}>{activeTrains}</ul>
                </div>
            </div>           
         );
    }
}
 
export default withStyles(styles)(StatusWindow);