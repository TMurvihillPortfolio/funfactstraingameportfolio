import React, { Component } from 'react';
import logo from '../img/logowText.png';
import '../css/SplashScreen.css';
//import { withStyles } from "@material-ui/core/styles";

// const styles = {
//     root: {
//         position: 'relative',
//         backgroundColor: 'transparent',
//         height: '100vh',
//         width: '100vh'
//     },
//     splashScreen: {
//         border: '7px double #a74227',
//         width: 0,
//         height: 0,
//         webkitAnimationName: 'example', /* Safari 4.0 - 8.0 */
//         webkitAnimationDuration: '4s', /* Safari 4.0 - 8.0 */
//         animationName: 'example',
//         animationDuration: '4s',
//         backgroundColor: 'transparent',
//         //zIndex: 1000,
//         opacity: 0,
//         transition: 'all 4s ease',
//         position: 'absolute',
//         top: '50%',
//         right: '50%',
//         transform: 'translate(50%, -50%)'

//     },
//     splashScreenImg: {
//         width: '100%',
//         height: '100%',
        
//     },
//     splashScreenShow: {
//         opacity: 1,
//         width: '700px',
//         height: '700px'
//     }
// }

class SplashScreen extends Component {
    state = {  }
    componentDidMount() {
        function myFunc() {
            splash.classList.add('splashScreenShow')
            setTimeout(() => splash.classList.remove('splashScreenShow'), 1500);
        }
        const splash = document.querySelector('#splash');
        splash.addEventListener('webkitTransitionEnd', splash.classList.remove('splashScreenShow'));
        splash.addEventListener('transitionEnd', splash.classList.remove('splashScreenShow'));
        setTimeout(() => myFunc(),100);
    }
    render() { 
        //const { classes } = this.props;
        return (
            // <div className='root'>
                <div id='splash' className='splashScreen'>
                    <img src={logo} className= 'splashScreenImg' alt='train logo "Fun Facts Train Game"'/>
                </div>
            // </div>           
         );
    }
}

export default SplashScreen;
// export default withStyles(styles)(SplashScreen);