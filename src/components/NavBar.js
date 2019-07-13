import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import logowText from '../img/logowText.png';
import {withStyles} from '@material-ui/core';

const styles = {
    NavBar: {
        backgroundColor: '#a74227',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-evenly',
        '& a': {
            textDecoration: 'none',
            fontSize: '20px',
            padding: '5px 7px',
            color: '#f7f6f5',
            borderBottom: '1px solid transparent',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                borderBottom: '1px solid #f7f6f5'
            },
            '& img': {
                height: '25px'
            }
        }
    },     
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
                <NavLink to='/'><img src={logowText} /></NavLink>
                <NavLink to='/funfactstrains/trainoperations'>TrainOperations</NavLink>
                <NavLink to='/funfactstrains/companymanagement'>CompanyManagement</NavLink>
                <NavLink to='/funfactstrains/illinois201'>Illinois 201</NavLink>
                <NavLink to='/funfactstrains/jennylind'>Jenny Lind</NavLink>
            </nav>
         );
    }
}
 
export default withStyles(styles)(NavBar);