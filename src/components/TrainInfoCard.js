import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/core';
import NavBar from './NavBar';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import { _TRAIN_DETAILS } from '../assets/constants';

let companyData = JSON.parse(localStorage.getItem('companyData'));
const styles = {
    TrainInfoCardCSS: {
        backgroundColor: 'lightsalmon',
        padding: '50px'
    },
    trainNameCSS: {
        marginTop: '100px',
        marginBottom: '40px',
        borderRadius: '7px'
    },
    trainImageCSS: {
        borderRadius: '7px',
        margin: '40px',
        boxShadow: '10px 10px 15px 4px #333'
    },
    factList: {
        listStyle: 'none',
        marginLeft: '-40px'
    },
    factItem: {       
    },
    button: {
        color: '#f3f2fa',
        margin: 'auto',
        marginBottom: '30px',
        backgroundColor: '#857cad',
        '&:hover': {
            backgroundColor: '#5f5592'
        }
    },
}

class TrainInfoCard extends PureComponent {
    constructor(props) {
        super(props);
        this.handleBuyClick=this.handleBuyClick.bind(this);
        this.state = {  }
    }
    handleBuyClick() {
        //initialize variables
        const { trainCost, trainId } = this.props.trainObj;
        companyData = JSON.parse(localStorage.getItem('companyData'));
        if (this.state.purchased === -1) {
            //check if enough money
            if (companyData.financials.cash >= trainCost) {
                companyData.financials.cash -= trainCost;
                companyData.trains.push({ id: trainId });
                this.setState({ purchased : 1  });
            } else {
                return alert('Not enough cash available to purchase train.');
            }
        } else {
            companyData.financials.cash += trainCost;
            const newArray = companyData.trains.filter(train => train.id !== this.props.trainObj.trainId)
            companyData.trains = newArray;
            this.setState({ purchased : -1 });
        }
               
        //update data                   
        localStorage.setItem('companyData', JSON.stringify(companyData));
        
    }
    render() { 
        const { classes } = this.props;
        const { trainName, trainImage, trainFacts, trainId, trainCost } = this.props.trainObj;
        companyData = JSON.parse(localStorage.getItem('companyData'));        
        const purchased = companyData.trains.findIndex(train => train.id === trainId);
        this.state.purchased = purchased;
        const factList = trainFacts.map(fact => 
            <li key={`${trainId}${fact}`} className={classes.factItem}><h4>{fact}</h4></li>);
        return ( 
            <div className={classes.trainNameCSS}>
                <AppBar >
                    <NavBar />
                </AppBar>
                <h1>{trainName}</h1>
                <img 
                    src={trainImage} 
                    alt='engraving of steam train' 
                    className={classes.trainImageCSS}
                />
                <div>
                    <Button
                            variant='contained'
                            className={classes.button}
                            color='primary'
                            onClick={this.handleBuyClick}
                    >
                            {purchased > -1 ? 'Sell Train' : 'Buy Train'}
                    </Button>
                </div>
                <Divider />
                    <ul className={classes.factList}>
                        <h2>Fun Facts</h2>
                        {factList}
                    </ul>
            </div>
         );
    }
}
 
export default withStyles(styles)(TrainInfoCard);