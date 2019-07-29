import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core/styles";
import NavBar from './NavBar';
import underConstruction from '../img/underConstruction.jpg';

const styles = {
    TrainOperationsHeader: {
        color: '#a74227',
        backgroundColor: '#c79382',
        fontFamily: 'algerian, sans-serif',
        fontSize: '36px',
        width: '60%',
        margin: 'auto',
        marginTop: 0,
        borderRadius: '7px',
    },
    trainImageCSS: {
        borderRadius: '7px',
        margin: '40px',
        boxShadow: '10px 10px 15px 4px #333',
        height: '500px'
    }
}

class CompanyManagement extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const { classes } = this.props; 
        return ( 
            <div>
                <NavBar />
                <h1 className={classes.TrainOperationsHeader}>CompanyManagement</h1>            
                <h1 className={classes.TrainOperationsHeader} style={{fontSize: '24px'}}>Under Construction</h1>              
                <img 
                    src={underConstruction} 
                    alt='1800s railroad construction' 
                    className={classes.trainImageCSS}
                /> 
            </div>
         );
    }
}
 
export default withStyles(styles)(CompanyManagement);