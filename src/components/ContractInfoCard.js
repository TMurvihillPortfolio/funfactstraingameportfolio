import React, { Component } from 'react';
import styles from '../styles/ContractInfoCardStyles';
import {withStyles} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { _CARGO_TYPES as cargoTypes } from '../assets/constants';
import { getLengthOfTrip } from '../assets/helpers';
import NavBar from './NavBar';

class ContractInfoCard extends Component {
    constructor(props) {
        super(props);
        this.getCargoObj = this.getCargoObj.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
        this.state = {};
    }
    componentDidMount() {
        //check for company data to be sure game in progress
        try {
            const initialCompanyData = JSON.parse(localStorage.getItem('companyData'));
            if (initialCompanyData === null) this.props.history.push('/');
          } catch  {
            this.props.history.push('/');
          }
    }
    //update contract status and start train if required
    handleClick() {
        //Make copy of contract object
        const contract = Object.assign({}, this.props.contractObj);
        //update value
        if (contract.status==='offered') {
            contract.status='accepted';
            this.props.updateContract(contract);
        //update value and start train
        } else if (contract.status==='accepted') {
            contract.status='started';
            this.props.startTrain(contract, this.props.history);
        }    
    }
    //helper function-gets all cargo object details based on contractObj.cargo
    getCargoObj() {
        const cargoType = this.props.contractObj.cargo;
        const cargoIndex = cargoTypes
            .findIndex(cargo => cargo.name === cargoType);
        return cargoTypes[cargoIndex];
    }
    //helper function-return user friendly button text based on contract status
    getButtonText() {
        const contract = this.props.contractObj;
        if (contract.status==='offered') return 'Accept Contract'; 
        if (contract.status==='accepted') return 'Start Train'; 
        if (contract.status==='started') return 'In Progress'; 
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
                <h3>Payment: {`$${Math.round(getLengthOfTrip(from, to)*.25)}.00`}</h3>               
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