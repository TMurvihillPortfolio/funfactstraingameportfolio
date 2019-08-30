import React, { Component } from 'react';
import styles from '../styles/SplashScreenStyles';
import logo from '../img/logowText.png';
import { withStyles } from "@material-ui/core/styles";

//UNDER CONSTRUCTION -- splash screen to be implemented later
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

export default withStyles(styles)(SplashScreen);