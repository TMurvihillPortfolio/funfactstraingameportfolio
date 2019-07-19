import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import companyData from '../assets/trainslist';
import ActiveTrain from './ActiveTrain';
import {_DRAWER_WIDTH as drawerWidth} from '../assets/constants';


const styles = {
    root: {
        height: '200px',
        width: `calc(100% - ${drawerWidth+45}px)`,
        position: 'fixed',
        bottom: 0,
        right: 0,
        //border: '7px double #a74227',
        borderRadius: '10px',
        backgroundImage: 'linear-gradient(rgba(250,244,216,.8), rgba(250,244,216,.8))'
    },
    progress: {
        display: 'flex',
        fontSize: '20px'     
    },
    progressCargo: {
        flex: '1',
    },
    progressTo: {
        flex: '1',
    },
    progressTrain: {
        flex: '7',
    },
    progressFrom: {
        flex: '1',
    },
    // activeTrain: {
    //     position: 'relative'
    // }

}
class StatusWindow extends Component {
    constructor(props) {
        super(props);
        const funFactsActiveTrains = [...JSON.parse(localStorage.getItem('funFactsActiveTrains'))];
        this.updatePositions=this.updatePositions.bind(this); 
        this.completeActiveTrain=this.completeActiveTrain.bind(this); 
        this.syncLocalStorage=this.syncLocalStorage.bind(this); 
        this.state = {
            activeTrains: funFactsActiveTrains || false         
         }
    }
    componentDidMount() {
        // const activeTrains = JSON.parse(localStorage.getItem('funFactsActiveTrains'));
        // this.setState({ activeTrains : activeTrains });
    }
    syncLocalStorage() {
        localStorage.setItem(
            'funFactsActiveTrains', 
            JSON.stringify(this.state.activeTrains))
        ;
    }
    updatePositions() {
        let deleteId = -1;
        const newTrains = this.state.activeTrains.map(train => {
            let newRight = train.right += 400/train.lengthOfTrip;
            if (train.right >= 400) {
                deleteId = train.id;
                console.log(deleteId);               
            }
            return {...train, right: newRight};
        });
        if (deleteId===-1) {
            this.setState({ activeTrains: newTrains });
        } else {
            this.completeActiveTrain(deleteId);
        }       
    }
    completeActiveTrain(deleteId) {
        this.setState(
            st => ({ activeTrains: st.activeTrains.filter(train => train.id !== deleteId) }),
            this.syncLocalStorage
        );     
    }
    render() { 
        localStorage.setItem('myData', JSON.stringify(companyData[0]));      
        const stringit = JSON.parse(localStorage.getItem('myData'));
        const { contracts } = companyData[0];
        console.log(contracts);

        //debugger;
        //const bigArray = [...this.state.activeTrains];
        //bigArray.map(ob => console.log(ob));
        //console.log('here', bigArray);

        const {classes} = this.props;
        
        //prepare an array that mixes infor from two props
        const fullArray = this.state.activeTrains.map(train => {
            const tempArray = []
            contracts.map(contract => {
                console.log('contractid', contract.id);
                console.log('train.contractID', train.contractId)
                if (train.contractId === contract.id) {
                    train.from = contract.from;
                    train.to = contract.to;
                    train.cargo = contract.cargo;
                    train.lengthOfTrip = 444;
                    console.log('fulltrain', train);
                    console.log('to', train.to);
                    tempArray.push(train);
                }
            });
            return tempArray;
        });
        console.log('fullArr', fullArray);
        const activeTrains = fullArray.map((train,index) => 
            <div key={index} className={classes.progress}>
                <div className={classes.progressTo}>{train[index].to}</div>                
                <div className={classes.progressTrain}>
                    <ActiveTrain 
                        right={this.state.activeTrains[index].right}
                        top={train.top}                       
                        updatePositions={this.updatePositions}
                        className={classes.activeTrain}
                    />
                </div>
                
                <div className={classes.progressFrom}>{train[index].from}</div>
                <div className={classes.progressCargo}>{train[index].cargo}</div>
            </div>
        );
        
        return ( 
            <div className={classes.root}> <h2>Active Trains</h2>
                <div>
                    {activeTrains?activeTrains:<h4 style={
                        {textAlign: 'center', marginLeft: '-25px'}
                    }>
                        No Active Trains at this time.
                    </h4>} 
                </div>
            </div>           
        );
    }
}
 
export default withStyles(styles)(StatusWindow);