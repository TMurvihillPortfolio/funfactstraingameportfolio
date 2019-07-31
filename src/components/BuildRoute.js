import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core/styles";
import NavBar from './NavBar';
import underConstruction from '../img/underConstruction.jpg';
import { _MEDIA_QUERIES } from '../assets/constants';
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
        [_MEDIA_QUERIES.down('sm')]: {
            fontSize: '16px'
        }     
    },
    trainImageCSS: {
        borderRadius: '7px',
        margin: '40px',
        boxShadow: '10px 10px 15px 4px #333',
        width: '500px',
        [_MEDIA_QUERIES.down('sm')]: {
            width: '200px'
        }
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
                <h1 className={classes.TrainOperationsHeader}>Build Route</h1>            
                <h2 className={classes.TrainOperationsHeader}>Under Construction</h2>            
                <h4 className={classes.TrainOperationsHeader} style={{ fontSize: '80%', marginTop: '8px', padding: '5px'}}>For now you can run your trains between all cities.</h4>            
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