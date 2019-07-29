import React, { Component } from 'react';
import styles from '../styles/StatusWindowStyles';
import { withStyles } from "@material-ui/core/styles";
import ActiveTrain from './ActiveTrain';

let companyData = JSON.parse(localStorage.getItem('companyData'));

class StatusWindow extends Component {
    constructor(props) {
        super(props);
        let funFactsActiveTrains;
        // if (localStorage.getItem('funFactsActiveTrains') !== null) {
        //     funFactsActiveTrains = [...JSON.parse(localStorage.getItem('funFactsActiveTrains'))];
        // }
        this.updatePositions=this.updatePositions.bind(this); 
        this.completeActiveTrain=this.completeActiveTrain.bind(this); 
        this.syncLocalActiveTrainStorage=this.syncLocalActiveTrainStorage.bind(this); 
        this.syncLocalCompanyStorage=this.syncLocalCompanyStorage.bind(this); 
        this.showNotification=this.showNotification.bind(this);
        this.state = {
            activeTrains: funFactsActiveTrains || false         
         }
    }
    syncLocalActiveTrainStorage() {
        localStorage.setItem(
            'funFactsActiveTrains', 
            JSON.stringify(this.state.activeTrains))
        ;
    }
    syncLocalCompanyStorage() {
        localStorage.setItem(
            'companyData', 
            JSON.stringify(companyData))
        ;
    }
    updatePositions() {
        let deleteId = -1;
        let deleteContractId = '';
        let lengthOfTrip = 0;
        const newTrains = this.props.activeTrains.map(train => {
            let newRight = train.right += 400/train.lengthOfTrip;
            if (train.right >= 400) {
                deleteId = train.id;
                deleteContractId = train.contractId; 
                lengthOfTrip = train.lengthOfTrip;             
            }
            return {...train, right: newRight};
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
        this.syncLocalActiveTrainStorage();
    }
    render() { 
        const { classes, activeTrains, companyData } = this.props;
        const { contracts } = companyData[0];
        let activeTrainsDisplay;
        console.log(activeTrains);
        activeTrains.map(train=>console.log(train.id));
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
                        tempTrain.from = contract.from;
                        tempTrain.to = contract.to;
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
                                right={activeTrains[index].right}
                                top={activeTrains[index].top}                       
                                updatePositions={this.updatePositions}
                                className={classes.activeTrain}
                            />
                        </div>
                        
                        <div className={classes.progressFrom}>{train[0].from}</div>
                        <div className={classes.progressCargo}>{train[0].cargo}</div>
                    </div>
                );
            }
        }       
        return ( 
            <div className={classes.root}> <h2>Active Trains</h2>
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