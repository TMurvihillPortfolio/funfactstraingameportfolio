import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core/styles";
import styles from '../styles/ActiveTrainStyles';
import trainOnMap from '../img/redtraincrop.png';
import { _TRAIN_UPDATE_INTERVAL } from '../assets/constants';

class ActiveTrain extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        //initialize variable
        const trainProgBar = document.querySelector('#trainProgressBar').getBoundingClientRect();
        //immediately update train position
        //this.props.updatePositions(trainProgBar.width);
        // regularly update train position
        this.updatePositions = setInterval(() =>{
            this.props.updatePositions(trainProgBar.width)}, _TRAIN_UPDATE_INTERVAL);
    }
    componentWillUnmount() {
        //clear update train position
        clearInterval(this.updatePositions);
    }

    render() { 
        const { classes, percentageComplete, top } = this.props;       
        return ( 
            <div style={{position: 'relative'}} id="trainProgressBar">
                <img 
                    src={trainOnMap} 
                    className={classes.trainOnMap} 
                    alt='train on a progress bar'
                    trainId={this.props.trainId}
                    style={{
                        top: `${top}px`, 
                        right: `${percentageComplete}%`
                    }}
                />          
            </div>
         );
    }
}
 
export default withStyles(styles)(ActiveTrain);