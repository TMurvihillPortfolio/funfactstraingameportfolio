import React, { Component } from 'react';
import styles from '../styles/ContractInfoCardStyles';
import {withStyles} from '@material-ui/core';
import NavBar from './NavBar';
import Divider from '@material-ui/core/Divider';
//import companyData from '../assets/trainslist';
import Button from '@material-ui/core/Button';
import uuid from 'uuid';
import { _TRIP_LENGTHS as tripLengths } from '../assets/constants';
import { _CARGO_TYPES as cargoTypes } from '../assets/constants';

let companyData; 

class ContractInfoCard extends Component {
    constructor(props) {
        super(props);
        this.getCargoObj = this.getCargoObj.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
        this.startTrain = this.startTrain.bind(this);
        this.getLengthOfTrip = this.getLengthOfTrip.bind(this);
        this.updateContractStatus = this.updateContractStatus.bind(this);
        this.syncLocalStorage = this.syncLocalStorage.bind(this);
        this.state = {
        };
    }
    updateContractStatus() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        const contract = companyData.contracts.find(contract => contract.id === this.props.contractObj.id);
        contract.status = 'started';
        console.log('after', companyData);
        this.syncLocalStorage();       
    }
    getCargoObj() {
        const cargoType = this.props.contractObj.cargo;
        const cargoIndex = cargoTypes
            .findIndex(cargo => cargo.name === cargoType);
        return cargoTypes[cargoIndex];
    }
    handleClick() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        const contract = companyData.contracts.find(contract => contract.id === this.props.contractObj.id);
        if (contract.status==='offered') {
            const ind = companyData.contracts.findIndex(contract => this.props.contractObj.id === contract.id);
            companyData.contracts[ind].status = 'accepted';
            this.syncLocalStorage();
        } else if (contract.status==='accepted') {
            this.startTrain();
        } 
        this.setState({ change : true });     
    }
    getButtonText() {
        companyData = JSON.parse(localStorage.getItem('companyData'));
        const contract = companyData.contracts.find(contract => contract.id === this.props.contractObj.id);
        if (contract.status==='offered') return 'Accept Contract'; 
        if (contract.status==='accepted') return 'Start Train'; 
        if (contract.status==='started') return 'In Progress'; 
    }
    getLengthOfTrip() {
        //Get trip distance between cities, data found in constants.js (_TRIP_LENGTHS)
        function getDistance(city1, city2) {
            for(let key in tripLengths) {
                if(key === city1) {
                    let cityList = tripLengths[key];
                    for(let city in cityList) {
                        if(city === city2) {
                            return cityList[city];
                        }
                    }
                }
            }
        }
        //Initialize variables
        let distance;
        let city1 = this.props.contractObj.from;
        let city2 = this.props.contractObj.to;
        
        //find for distance
        distance = getDistance(city1, city2);

        //if distance not found, switch city order and find again
        if (distance===undefined) {
            city1 = this.props.contractObj.to;
            city2 = this.props.contractObj.from;
            distance = getDistance(city1, city2);
        } 
        
        //Error handling NOT YET IMPLEMENTED
        if (distance===undefined) {           
            return 'Distance between cities not found';
        }

        //return result
        return distance;        
    }
    syncLocalStorage() {
        localStorage.setItem(
            'companyData', 
            JSON.stringify(companyData))
        ;
    }
    startTrain() {
        let activeTrains = JSON.parse(localStorage.getItem('funFactsActiveTrains')) || [];
        const newObj = {
            id: uuid(),
            contractId: this.props.contractObj.id,
            top: 8,
            right: 0,
            lengthOfTrip: this.getLengthOfTrip()
        }
        //update trains in state and storage
        activeTrains.push(newObj);

        //update local storage
        const ind = companyData.contracts.findIndex(contract => this.props.contractObj.id === contract.id);
        companyData.contracts[ind].status = 'started'; 
        this.syncLocalStorage();       
        localStorage.setItem('funFactsActiveTrains', JSON.stringify(activeTrains));
        
        //back to train operations
        this.props.history.push('/funfactstrains/trainoperations');                  
    }
    render() {        
        const myCargo = this.getCargoObj();
        const { image, cargoFacts } = myCargo;
        const { classes } = this.props;
        const { cargo, from, to, contractId } = this.props.contractObj;
        const funFacts = cargoFacts.map(fact => 
            <li 
                key={`${contractId}${fact}`} 
                className={classes.factItem}
            >
                <p>{fact}</p>
            </li>
        );
        return ( 
            <div >
                <NavBar />
                <h1>{cargo.toUpperCase()}</h1>
                <h1>{from} to {to}</h1>
                <h3>Payment: {`$${Math.round(this.getLengthOfTrip(from, to)*.25)}.00`}</h3>               
                <img 
                    src={image} 
                    alt='contract cargo' 
                    className={classes.trainImageCSS}
                />
                <h2><Button
                        variant='contained'
                        className={classes.button}
                        style={{backgroundColor: '#a74227', color: 'whitesmoke'}}
                        onClick={this.handleClick}
                    >
                        {this.getButtonText()}
                    </Button></h2>
                <Divider />
                <h3>Fun Facts about {cargo}</h3>
                <Divider />
                <ul className={classes.factList}>
                    {funFacts}
                </ul>
            </div>
         );
    }
}
 
export default withStyles(styles)(ContractInfoCard);