import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import logowText from '../img/logowText.png';
import {withStyles} from '@material-ui/core';

const styles = {
    NavBar: {
        backgroundColor: '#a74227',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '64px',
        marginLeft: '-15px'
    },
    logo: {
        '& img': {
            height: '65px',
            width: '100px',
            margin: '-25px 15px -25px -23px'
        }       
    }, 
    links: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        "& a": {
            textDecoration: 'none',
            fontSize: '20px',
            padding: '5px 15px',
            color: '#f7f6f5',
            borderBottom: '1px solid transparent',
            transition: 'all 0.3s ease-in-out'
            
        },
        '& a:hover': {
            borderBottom: '1px solid #f7f6f5'
        },
        
    }    
}

class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { classes } = this.props;
        return ( 
            <nav className={classes.NavBar}>
                <NavLink className={classes.logo} to='/'><img src={logowText} alt='logo Fun Facts Train Game'/></NavLink>
                <div className={classes.links}>    
                    <NavLink to='/funfactstrains/trainoperations'>TrainOperations</NavLink>
                    <NavLink to='/funfactstrains/companymanagement'>CompanyManagement</NavLink>
                    <NavLink to='/funfactstrains/trains/illinoiscentral201'>Illinois 201</NavLink>
                    <NavLink to='/funfactstrains/trains/jennylind'>Jenny Lind</NavLink>
                </div>
            </nav>
         );
    }
}
 
export default withStyles(styles)(NavBar);