import React, { PureComponent } from 'react';
import styles from '../styles/TrainInfoCardStyles';
import {withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import NavBar from './NavBar';
import { _TRAIN_DETAILS } from '../assets/constants';

class TrainInfoCard extends PureComponent {
    constructor(props) {
        super(props);
        this.handleBuyClick=this.handleBuyClick.bind(this);
        this.state = {  }
    }
    handleBuyClick() {
        const purchased = (this.props.companyTrains === undefined || (this.props.companyTrains.findIndex(train => train.id === this.props.trainObj.trainId) === -1)) ? false : true;
        this.props.buySellTrain(this.props.trainObj, purchased);
    }
    render() { 
        console.log('traininfoprops', this.props);
        const { classes, companyTrains } = this.props;
        const { trainName, trainImage, trainFacts, trainId, trainCost } = this.props.trainObj;
        const purchased = (companyTrains === undefined || (companyTrains.findIndex(train => train.id === trainId) === -1)) ? false : true;
        console.log('trainindo', purchased);
        const factList = trainFacts.map(fact => 
            <li 
                key={`${trainId}${fact}`} 
                className={classes.factItem}
            >
            <h4>{fact}</h4>
            </li>
        );
        return ( 
            <div className={classes.trainNameCSS}>
                <AppBar >
                    <NavBar />
                </AppBar>
                <h1>{trainName}</h1>
                <h3>{`$${trainCost}.00`}</h3>
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
                            {purchased ? 'Sell Train' : 'Buy Train'}
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