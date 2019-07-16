import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/core';
import NavBar from './NavBar';

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

class TrainInfoCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { classes } = this.props;
        const { trainName, trainImage, trainFacts, trainId } = this.props.trainObj;
        const factList = trainFacts.map(fact => 
            <li key={`${trainId}${fact}`} className={classes.factItem}><h4>{fact}</h4></li>);
        return ( 
            <div className={classes.trainNameCSS}>
                <NavBar />
                <h1>{trainName}</h1>
                <img 
                    src={trainImage} 
                    alt='engraving of steam train' 
                    className={classes.trainImageCSS}
                />
                <ul className={classes.factList}>
                     <h2>Fun Facts</h2>
                     {factList}
                 </ul>
            </div>
         );
    }
}
 
export default withStyles(styles)(TrainInfoCard);