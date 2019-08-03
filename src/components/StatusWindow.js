import React, { Component } from 'react';
import uuid from 'uuid';
import styles from '../styles/StatusWindowStyles';
import { withStyles } from "@material-ui/core/styles";
import ActiveTrain from './ActiveTrain';
import { _CITY_ABBR, _TRAIN_SPEED } from '../assets/constants';

class StatusWindow extends Component {
    constructor(props) {
        super(props);
        let funFactsActiveTrains;
        this.updatePositions=this.updatePositions.bind(this); 
        this.completeActiveTrain=this.completeActiveTrain.bind(this); 
        this.showNotification=this.showNotification.bind(this);
        this.state = {
            activeTrains: funFactsActiveTrains || false         
         }
    }
    updatePositions(trainProgressBarWidth) {
        //*** number of increments(seconds) = lenth of trip / _TRAIN_SPEED miles (per second) */
        //*** percentageInc = bar width / number of increments */

        let deleteId = -1;
        let deleteContractId = '';
        let lengthOfTrip = 0;
        let numIncrements;
        let percentageChange;
        const newTrains = this.props.activeTrains.map(train => {
            numIncrements = train.lengthOfTrip/1;
            percentageChange = trainProgressBarWidth / numIncrements;
            let newPercentageComplete = train.percentageComplete += percentageChange;
            if (train.percentageComplete >= 90) {
                deleteId = train.id;
                deleteContractId = train.contractId; 
                lengthOfTrip = train.lengthOfTrip;             
            }
            return {...train, percentageComplete: newPercentageComplete};
        });
        if (deleteId===-1) {
            this.props.updateActiveTrains(newTrains);
        } else {
            this.completeActiveTrain(deleteId, deleteContractId, lengthOfTrip);
        }       
    }
    showNotification(deleteContractId) {
        const contracts = this.props.companyData[0].contracts;
        const notification = document.querySelector('#notification');
        const completedContract = contracts.find(
            contract => contract.id === deleteContractId
        );
        notification.innerText = `${completedContract.cargo.toUpperCase()}--${completedContract.from} to ${completedContract.to} completed its run.`;
        notification.style.transform = 'translateY(0)';
        setTimeout(() => notification.style.transform = 'translateY(60px)', 4000);
    }
    completeActiveTrain(deleteId, deleteContractId, lengthOfTrip) {
        // show completed notification
        this.showNotification(deleteContractId);

        // update activeTrains
        const newTrains = this.props.activeTrains.filter(train => train.id !== deleteId);
        this.props.updateActiveTrains(newTrains);
        
        //copy companyData
        const companyDataCopy = this.props.companyData;

        //update cash
        const payment = Math.round(lengthOfTrip*.25);
        companyDataCopy[0].financials.cash += payment;

        // delete contract
        const newContractArray = companyDataCopy[0].contracts.filter(
            contract => contract.id !== deleteContractId
        );
        companyDataCopy[0].contracts = newContractArray;
        
        // update state
        this.props.updateCompanyData(companyDataCopy);       
    }
    componentWillUnmount() {
        //this.syncLocalActiveTrainStorage();
    }
    render() { 
        const { classes, activeTrains, companyData } = this.props;
        const { contracts } = companyData[0];
        let activeTrainsDisplay;
        if (activeTrains !== undefined && activeTrains.length > 0) {
            //prepare an array that mixes infor from two props
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
                    {activeTrainsDisplay?activeTrainsDisplay:<h4 style={
                        {textAlign: 'center', marginLeft: '-25px'}
                    }>
                        No Active Trains at this time.
                    </h4>} 
                </div>
                <div className={classes.notification} id='notification'>
                    Train completed run.
                </div>
            </div>           
        );
    }
}
 
export default withStyles(styles)(StatusWindow);