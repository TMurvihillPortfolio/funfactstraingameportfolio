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
import { withStyles } from "@material-ui/core/styles";

import trainOnMap from '../img/redtraincrop.png';


const styles = {
    trainOnMap: {
        height: '8px', 
        position: 'absolute'
    }
}
class ActiveTrain extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        // UPDATE PARENT STATE
        this.updatePositions = setInterval(() =>{
            this.props.updatePositions()}, 500);
    }
    
    componentWillUnmount() {
       clearInterval(this.updatePositions);
    }

    render() { 
        const { classes, right, top } = this.props;
        return ( 
            <div style={{position: 'relative'}}>
            <img 
                src={trainOnMap} 
                className={classes.trainOnMap} 
                alt='train on a progress bar'
                style={{
                    top: `${top}px`, 
                    right: `${right}px`
                }}
            />
            
            </div>
         );
    }
}
 
export default withStyles(styles)(ActiveTrain);