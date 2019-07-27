import React, { Component } from 'react';
import styles from '../styles/StatusWindowStyles';
import { withStyles } from "@material-ui/core/styles";
import ActiveTrain from './ActiveTrain';

let companyData = JSON.parse(localStorage.getItem('companyData'));

class StatusWindow extends Component {
    constructor(props) {
        super(props);
        let funFactsActiveTrains;
        if (localStorage.getItem('funFactsActiveTrains') !== null) {
            funFactsActiveTrains = [...JSON.parse(localStorage.getItem('funFactsActiveTrains'))];
        }
        console.log(funFactsActiveTrains);
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
        const newTrains = this.state.activeTrains.map(train => {
            let newRight = train.right += 400/train.lengthOfTrip;
            if (train.right >= 50) {
                deleteId = train.id;
                deleteContractId = train.contractId; 
                lengthOfTrip = train.lengthOfTrip;             
            }
            return {...train, right: newRight};
        });
        if (deleteId===-1) {
            this.setState({ activeTrains: newTrains },this.syncLocalStorage);
        } else {
            this.completeActiveTrain(deleteId, deleteContractId, lengthOfTrip);
        }       
    }
    showNotification(deleteContractId) {
        const notification = document.querySelector('#notification');
        const completedContract = companyData.contracts.find(contract => contract.id === deleteContractId);
        notification.innerText = `${completedContract.cargo.toUpperCase()}--${completedContract.from} to ${completedContract.to} completed its run.`;
        notification.style.transform = 'translateY(0)';
        setTimeout(() => notification.style.transform = 'translateY(60px)', 4000);
    }
    completeActiveTrain(deleteId, deleteContractId, lengthOfTrip) {
        this.showNotification(deleteContractId);
        const payment = Math.round(lengthOfTrip*.25);
        this.setState(
            st => ({ activeTrains: st.activeTrains.filter(train => train.id !== deleteId) }),
            this.syncLocalActiveTrainStorage
        );
        companyData = JSON.parse(localStorage.getItem('companyData'));
        let newArray = companyData.contracts.filter(contract => contract.id !== deleteContractId);
        companyData.contracts = newArray;
        companyData.financials.cash += payment;
        this.syncLocalCompanyStorage();
        
    }
    componentWillUnmount() {
        this.syncLocalActiveTrainStorage();
    }
    render() { 
        let activeTrains;
        const contracts = Array.from(companyData.contracts);        
        const {classes} = this.props;
        if (this.state.activeTrains) {
            //prepare an array that mixes infor from two props
            const fullArray = this.state.activeTrains.map(train => {
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
                activeTrains = fullArray.map((train,index) => 
                    <div key={index} className={classes.progress}>
                        <div className={classes.progressTo}>{train[0].to}</div>                
                        <div className={classes.progressTrain}>
                            <ActiveTrain 
                                right={this.state.activeTrains[index].right}
                                top={this.state.activeTrains[index].top}                       
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
                    {activeTrains?activeTrains:<h4 style={
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