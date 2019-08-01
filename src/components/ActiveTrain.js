// /*
//  * A simple React component
//  */

// import React, { PureComponent } from 'react';
// const onInputChangeCommon = function(event) {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value
//     });
  
//     if (name === "showHideCustomDatetime" && value) {
//       this.interval = setInterval(this.getTime, 1000);
//     } else if (name === "showHideCustomDatetime" && !value) {
//       clearInterval(this.interval);
//     }
//   };
  
//   const setTime = function() {
//     const time = new Date();
//     // this.props.setEnterTimeCustomDatetime(time);
//     this.callBack(time);
//     this.setState({
//       enterTime: time
//     });
//   };
  
//   class ActiveTrain extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         showHideCustomDatetime: true,
//         enterTime: new Date()
//       };
//       this.onInputChangeCommon = onInputChangeCommon.bind(this);
//       this.setTime = setTime.bind(this);
//       this.callBack = this.props.callBack.bind(this);
//     }
  
//     componentDidMount() {
//       this.setState({ showHideCustomDatetime: true });
//       this.interval = setInterval(this.setTime, 1000);
//     }
  
//     componentWillUnmount() {
//       clearInterval(this.interval);
//     }
  
//     render() {
//       return <div>{this.state.enterTime.getTime()}</div>;
//     }
//   }
  
//   class Application extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         value: null
//       };
//       // this.setTime = setTime.bind(this);
//       this.clickHandler = this.clickHandler.bind(this);
//       this.callBack = this.callBack.bind(this);
//     }
  
//     clickHandler() {
//       console.log(this.value)
//     }
  
//     callBack(value) {
//       this.value = value;
//       // this.setState({time: value})
//     }
  
//     render() {
//       function random() {
//         return Math.random() * (1000 - 0) + 0;
//       }
//       return (
//         <div>
//           <div>{random()}</div>
//           <ActiveTrain callBack={this.callBack} />
//           <button onClick={this.clickHandler}>log the current time</button>
//         </div>
//       );
//     }
//   }
  
//   export default ActiveTrain;



import React, { PureComponent } from 'react';
import styles from '../styles/ActiveTrainStyles';
import { withStyles } from "@material-ui/core/styles";
import uuid from 'uuid';

import trainOnMap from '../img/redtraincrop.png';

class ActiveTrain extends PureComponent {
    constructor(props) {
        super(props);
        this.getTrainPosition=this.getTrainPosition.bind(this);
        this.state = {}
    }
    componentDidMount() {
        console.log(this);
        const trainProgBar = document.querySelector('#trainProgressBar').getBoundingClientRect();
        console.log(trainProgBar);
        // UPDATE PARENT STATE
        this.updatePositions = setInterval(() =>{
            this.props.updatePositions(trainProgBar.width)}, 2000);
    }
    getTrainPosition(trainId) {
        // const trainProgressBarWidth = document.querySelector('#trainProgressBar').getBoundingClientRect().width;
        // const trainProgressBarRight = document.querySelector('#trainProgressBar').getBoundingClientRect().right;
        
    
        // const trainPosition = trainProgressBarRight + trainProgressBarWidth*this.props.percentageComplete;

        // const trainImg = document.querySelector(`[trainId="${trainId}"]`);
        // console.log(trainImg);
        
        // console.log('trprogbarWd', trainProgressBarWidth);
        // console.log('trprogbarRg', trainProgressBarRight);
        // console.log('trposition', trainPosition);
        // trainImg.style.right = `${this.props.percentageComplete}%`;
    }
    componentWillUnmount() {
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