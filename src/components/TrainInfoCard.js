import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/core';


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
        borderRadius: '7px'
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
        const { trainName, trainImage, trainFacts } = this.props.trainObject;
        const factList = trainFacts.map(fact => 
            <li className={classes.factItem}><h4>{fact}</h4></li>);
        return ( 
            <div className={classes.TrainInfoCardCSS}>
                <h1 className={classes.trainNameCSS}>{trainName}</h1>
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