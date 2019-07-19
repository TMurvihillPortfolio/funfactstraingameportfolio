import React, { Component } from 'react';
import {withStyles} from '@material-ui/core';
import NavBar from './NavBar';
import Divider from '@material-ui/core/Divider';
import companyData from '../assets/trainslist';
import Button from '@material-ui/core/Button';
import uuid from 'uuid';
import { _TRIP_LENGTHS as tripLengths } from '../assets/constants';

const styles = {
    TrainInfoCardCSS: {
        backgroundColor: 'lightsalmon',
        padding: '50px'
    },
    trainNameCSS: {
        marginBottom: '40px',
        borderRadius: '7px'
    },
    trainImageCSS: {
        borderRadius: '7px',
        margin: '40px',
        boxShadow: '10px 10px 15px 4px #333'
    },
    factList: {
        listStyle: 'none'
    },
    factItem: {   
        textAlign: 'center'    
    }
}

class ContractInfoCard extends Component {
    constructor(props) {
        super(props);
        this.getCargoObj = this.getCargoObj.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
        this.startTrain = this.startTrain.bind(this);
        this.getLengthOfTrip = this.getLengthOfTrip.bind(this);
        this.state = {
            status : 'offered',
            myValue : 'min'
        };
    }
    getCargoObj() {
        const cargoType = this.props.contractObj.cargo;
        const cargoIndex = companyData[0].cargoTypes
            .findIndex(cargo => cargo.name === cargoType);
        return companyData[0].cargoTypes[cargoIndex];
    }
    handleClick() {
        if (this.state.status==='offered') {
            this.setState({ status: 'accepted' });
        }
        ////////////////////// STATUS CHANGED FROM STARTED FOR TESTING
        if (this.state.status==='accepted') {
            this.setState({ status: 'accepted' }, this.startTrain());
        }
    }
    getButtonText() {
        if (this.state.status==='offered') return 'Accept Contract'; 
        if (this.state.status==='accepted') return 'Start Train'; 
        if (this.state.status==='started') return 'In Progress'; //NOT YET IMPLEMENTED -- add time left
    }
    getLengthOfTrip() {
        //Declare variables
        let city1, city2;
        
        //Account for either from/to order, Chi-Atl or Atl-Chi, etc.
        if (this.props.contractObj.from === "Atlanta") {
            city2 = this.props.contractObj.from;
            city1 = this.props.contractObj.to;
        } else {
            city1 = this.props.contractObj.from;
            city2 = this.props.contractObj.to;
        }
        
        //Get trip distance from tripLength object
        for(let key in tripLengths) {
            if(tripLengths.hasOwnProperty(city1)) {
                let cityList = tripLengths[key];
                for(let city in cityList) {
                    if(city === city2) {
                        return cityList[city];
                    }
                }
            }
        }

        //Error handling NOT YET IMPLEMENTED
        return 'Distance between cities not found';
    }
    startTrain() {
        let activeTrains = JSON.parse(localStorage.getItem('funFactsActiveTrains'));
        const newObj = {
            id: uuid(),
            contractId: this.props.contractObj.id,
            top: 10,
            right: 0,
            lengthOfTrip: this.getLengthOfTrip()
        }
        console.log('newobj', newObj);
        const newArray=[...activeTrains, newObj];
        console.log(newArray);
        localStorage.setItem('funFactsActiveTrains', JSON.stringify(newArray));
    }
    render() {        
        const myCargo = this.getCargoObj();
        const { image, cargoFacts } = myCargo;
        const { classes } = this.props;
        //console.log('props', this.props);
        console.log('end',this.getLengthOfTrip());
        const { cargo, from, to, status, contractId } = this.props.contractObj;
        const funFacts = cargoFacts.map(fact => 
            <li 
                key={`${contractId}${fact}`} 
                className={classes.factItem}
            >
                <h4>{fact}</h4>
            </li>
        );
        // const factList = contractFacts.map(fact => 
        //     <li key={`${fact}`} className={classes.factItem}><h4>{fact}</h4></li>);
        return ( 
            // <div className={classes.trainNameCSS}>
            <div >
                <NavBar />
                <h1>{cargo.toUpperCase()}</h1>
                <h1>{from} to {to}</h1>
                
                <img 
                    src={image} 
                    alt='engraving of steam contract' 
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
                <h3>FunFact List</h3>
                <Divider />
                <ul className={classes.factList}>
                    {funFacts}
                </ul>
            </div>
         );
    }
}
 
export default withStyles(styles)(ContractInfoCard);