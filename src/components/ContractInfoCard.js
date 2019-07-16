import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/core';
import NavBar from './NavBar';
import Divider from '@material-ui/core/Divider';
import companyData from '../assets/trainslist';

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
    }
}

class ContractInfoCard extends PureComponent {
    constructor(props) {
        super(props);
        this.getCargoObj = this.getCargoObj.bind(this);
        this.state = {};
    }
    getCargoObj() {
        const cargoType = this.props.contractObj.cargo;
        const cargoIndex = companyData[0].cargoTypes.findIndex(cargo => cargo.name === cargoType);
        return companyData[0].cargoTypes[cargoIndex];
        // return companyData[0].cargoTypes[cargoIndex].cargoFacts;
        
        //console.log(cargoType);
        //console.log(cargoObj);
    }
    render() { 
        const myCargo = this.getCargoObj();
        const { image, cargoFacts } = myCargo;
        const { classes } = this.props;
        const { cargo, from, to, offerDate, accepted, contractId, pathName } = this.props.contractObj;
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
                <h3>Contract Proffered: {offerDate}</h3>
                <h3>{accepted ? "Contract Accepted" : "Not yet accepted."}</h3>
                <Divider />
                <h4>Fun factList</h4>
                <ul>
                    {funFacts}
                </ul>

            </div>
         );
    }
}
 
export default withStyles(styles)(ContractInfoCard);