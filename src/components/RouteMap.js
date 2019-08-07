import React, { Component } from 'react';
import {withStyles} from '@material-ui/core';
import NavBar from './NavBar';
import backgroundMap from '../img/usmap1930NewYorkChicagowNames.jpg';

const styles = {
    root: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${backgroundMap})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
}

class RouteMap extends Component {
    state = {  }
    render() { 
        return (            
            <div className={this.props.classes.root}>
                <NavBar />
            </div>
        );
    }
}
 
export default withStyles(styles)(RouteMap);