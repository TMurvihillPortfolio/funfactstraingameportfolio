import React, { Component } from 'react';
import uuid from 'uuid';
import styles from '../styles/StatusWindowStyles';
import { withStyles } from "@material-ui/core/styles";
import ActiveTrain from './ActiveTrain';
import { syncLocalStorageActiveTrains } from '../assets/helpers';
import { 
        _CITY_ABBR, 
        _TRAIN_SPEED, 
        _TRAIN_UPDATE_INTERVAL
    } 
    from '../assets/constants'
;

class StatusWindow extends Component {
    constructor(props) {
        super(props);
        this.updatePositions=this.updatePositions.bind(this); 
        this.completeActiveTrain=this.completeActiveTrain.bind(this); 
        this.showNotification=this.showNotification.bind(this);
        this.incrementsSinceUpdate=this.incrementsSinceUpdate.bind(this);
        this.state = {}
    }
    componentDidMount() {
        this.showNotification(0, "Updating Trains"); 
    }
    incrementsSinceUpdate(train) {
        //get seconds since last update
        const secondsSinceLastUpdate = Math.round(
            (new Date() - 
            new Date(train.lastUpdatePosition)) / 1000
        );
        //get update increments since last update     
        let updateIncrementsMissed = 1;
        if (secondsSinceLastUpdate > _TRAIN_UPDATE_INTERVAL/1000 ) {
            updateIncrementsMissed = Math.round(secondsSinceLastUpdate/(_TRAIN_UPDATE_INTERVAL/1000));
        }
        //return update increments missed
        return updateIncrementsMissed;
    }
    updatePositions(trainProgressBarWidth) {
        //initialize variables     
        let deleteId = -1;
        let deleteContractId = '';
        let lengthOfTrip = 0;        
        //update each active train
        const newTrains = this.props.activeTrains.map(train => {
            //check for missed updates
            const updateIncrementsMissed = this.incrementsSinceUpdate(train);           
            //prepare new percentage complete variable
            const numIncrements = train.lengthOfTrip/_TRAIN_SPEED;
            const percentageChange = (trainProgressBarWidth / numIncrements)*updateIncrementsMissed;
            const newPercentageComplete = train.percentageComplete += percentageChange;          
            //populate delete variables if train has completed its run
            if (newPercentageComplete >= 90) {
                deleteId = train.id;
                deleteContractId = train.contractId; 
                lengthOfTrip = train.lengthOfTrip;             
            }
            //refresh time of last update
            let newLastUpdatePosition = Date();
            //return updated active trains object
            return {...train, percentageComplete: newPercentageComplete, lastUpdatePosition: newLastUpdatePosition};
        });
        // if run in progress, update Active Trains
        if (deleteId===-1) {
            this.props.updateActiveTrains(newTrains);
        // if run complete, call complete train function
        } else {
            this.completeActiveTrain(deleteId, deleteContractId, lengthOfTrip);
        }       
    }
    showNotification(deleteContractId, message=false) {
        const notification = document.querySelector('#notification');
        let showTime = 4000;
        if (message) {
            notification.innerText = message; 
            showTime = _TRAIN_UPDATE_INTERVAL;           
        } else {           
            const contracts = this.props.companyData[0].contracts;
            const completedContract = contracts.find(
                contract => contract.id === deleteContractId
            );
            notification.innerText = `${completedContract.cargo.toUpperCase()}--${completedContract.from} to ${completedContract.to} completed its run.`;
        }
        notification.style.transform = 'translateY(0)';
        setTimeout(() => notification.style.transform = 'translateY(60px)', showTime);
    }
    completeActiveTrain(deleteId, deleteContractId, lengthOfTrip) {
        // show completed notification
        this.showNotification(deleteContractId);

        // update activeTrains
        const newTrains = this.props.activeTrains.filter(train => train.id !== deleteId);
        this.props.updateActiveTrains(newTrains);
        
        //copy companyData
        const companyDataCopy = this.props.companyData;

        //update cash & notify if winner
        const payment = Math.round(lengthOfTrip*.25);
        const below2000 = companyDataCopy[0].financials.cash < 2000;
        companyDataCopy[0].financials.cash += payment;
        if (companyDataCopy[0].financials.cash > 2000 && below2000) {
            const goal = document.querySelector('#goal');
            if (this.props.companyData[0].financials.cash >= 2000) {
                if (goal !== undefined && goal !== null) goal.innerText='WINNER, WINNER, $2000 reached!!';
            }
        }

        // delete contract
        const newContractArray = companyDataCopy[0].contracts.filter(
            contract => contract.id !== deleteContractId
        );
        companyDataCopy[0].contracts = newContractArray;
        
        // update state
        this.props.updateCompanyData(companyDataCopy);       
    }
    componentWillUnmount() {
        syncLocalStorageActiveTrains(this.props.activeTrains);
    }
    render() { 
        //initialize variables
        const { classes, activeTrains, companyData } = this.props;
        const { contracts } = companyData[0];
        let activeTrainsDisplay;
        //prepare an array that mixes info from two props
        if (activeTrains !== undefined && activeTrains !== null && activeTrains.length > 0) {           
            const fullArray = activeTrains.map(train => {
                const tempArray = [];
                let tempTrain = {};               
                contracts.map(contract => {
                   if (train.contractId === contract.id) {
                        tempTrain.id = train.id;
                        tempTrain.contractId = train.contractId;
                        tempTrain.lengthOfTrip = train.lengthOfTrip;
                        tempTrain.right = train.right;
                        tempTrain.from = _CITY_ABBR[contract.from].toUpperCase();
                        tempTrain.to = _CITY_ABBR[contract.to].toUpperCase();
                        tempTrain.cargo = contract.cargo;
                        tempArray.push(tempTrain);
                        tempTrain = [];
                    }
                });
                return tempArray;
            });
            //prepare html to display trains
            if (fullArray.length > 0 && fullArray[0].length > 0 ) {
                activeTrainsDisplay = fullArray.map((train,index) => 
                    <div key={index} className={classes.progress}>
                        <div className={classes.progressTo}>{train[0].to}</div>                
                        <div className={classes.progressTrain}>
                            <ActiveTrain 
                                percentageComplete={activeTrains[index].percentageComplete}
                                top={activeTrains[index].top}                       
                                updatePositions={this.updatePositions}
                                className={classes.activeTrain}
                                trainId={uuid()}
                            />
                        </div>                        
                        <div className={classes.progressFrom}>{train[0].from}</div>
                        <div className={classes.progressCargo}>{train[0].cargo}</div>
                    </div>
                );
            }
        }       
        return ( 
            <div className={classes.root} id='statusWindow'> <h2>Active Trains</h2>
                <div>
                    {activeTrainsDisplay?
                        activeTrainsDisplay:
                        <h4 style={{textAlign:'center'}}>
                            No Active Trains at this time.
                        </h4>
                    } 
                </div>
                <div className={classes.notification} id='notification'>
                    Train completed run.
                </div>
            </div>           
        );
    }
}
 
export default withStyles(styles)(StatusWindow);