import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import companyData from '../assets/trainslist';
import ActiveTrain from './ActiveTrain';
import { TransitionGroup } from 'react-transition-group';


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
        const funFactsActiveTrains = [...JSON.parse(localStorage.getItem('funFactsActiveTrains'))];
        console.log('constr',funFactsActiveTrains);
        this.updatePositions=this.updatePositions.bind(this); 
        this.completeActiveTrain=this.completeActiveTrain.bind(this); 
        this.syncLocalStorage=this.syncLocalStorage.bind(this); 
        this.state = {
            activeTrains: funFactsActiveTrains || false         
         }
    }
    syncLocalStorage() {
        console.log('sync before', this.state.activeTrains);
        localStorage.setItem(
            'funFactsActiveTrains', 
            JSON.stringify(this.state.activeTrains))
        ;
    }
    updatePositions() {
        const newTrains = this.state.activeTrains.map(train => {
            let newRight = train.right += 1;
            return {...train, right: newRight};
        });
        this.setState({ activeTrains: newTrains }, this.completeActiveTrain());
    }
    completeActiveTrain() {
        let deleteId="";
        let filterArray = [];
        const copyState = [...this.state.activeTrains];
        console.log(deleteId)
        copyState.map(train => {
            if (train.right >= train.completed) {
                
                filterArray = copyState.filter(filterTrain => filterTrain.id !== train.id );
                this.setState({ activeTrains : filterArray }, this.syncLocalStorage());
            }
        });
    }
    render() { 
        localStorage.setItem('myData', JSON.stringify(companyData[0]));      
        const stringit = JSON.parse(localStorage.getItem('myData'));
        
        //const bigArray = [...this.state.activeTrains];
        //bigArray.map(ob => console.log(ob));
        //console.log('here', bigArray);

        const {classes} = this.props;
        
        const activeTrains = this.state.activeTrains.map((train,index) => 
            <li key={index}>
                <ActiveTrain 
                    right={this.state.activeTrains[index].right}
                    top={train.top}                       
                    updatePositions={this.updatePositions}
                />
            </li>
        );
        
        return ( 
            <div>
                <div className={classes.root}> <h4>Active Trains</h4>
                    <ul className={classes.list}>
                        {activeTrains?activeTrains:<h2 style={{textAlign: 'center', marginLeft: '-25px'}}>No Active Trains at this time.</h2>} 
                        {/* <ActiveTrain 
                            right={120}
                            top={650}
                            updatePositions={this.updatePositions}
                        />
                        <ActiveTrain 
                            right={100}
                            top={670}
                            updatePositions={this.updatePositions}
                        /> */}
                    </ul>
                </div>
            </div>           
         );
    }
}
 
export default withStyles(styles)(StatusWindow);