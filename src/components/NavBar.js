import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBarStyles';
import logo from '../img/logo.jpg';
import { withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.handleOpenMobile=this.handleOpenMobile.bind(this);
        this.handleCloseMobile=this.handleCloseMobile.bind(this);
    }
    handleOpenMobile(e) {
        //initialize variables
        const links = document.querySelector('#links');
        const navBar = document.querySelector('#navBar');
        const a_links = [...document.querySelectorAll('#links>a')];
        const mobileMenu = document.querySelector('#mobileMenu');
        const clearIcon = document.querySelector('#clearIcon');
        
        //style mobile vertical menu
        links.style.flexDirection= 'column';
        links.style.alignItems= 'flex-end';
        links.style.position= 'absolute';
        links.style.right= '0';
        links.style.textAlign= 'right';      
        links.style.top= '0';
        links.style.backgroundColor= 'rgb(0,128,128)';
        links.style.backgroundColor= 'rgba(0,128,128,0.8)';
        links.style.borderRadius = '7px';
        links.style.padding = '5px 0 5px 5px';
        a_links.map(link => link.style.fontSize='12px');

        //show menu and close icon, hide hamburger icon
        navBar.style.display= 'flex';
        mobileMenu.style.display = 'none';
        clearIcon.style.display = 'flex';
    }
    handleCloseMobile(e) {
        //initialize variables
        const navBar = document.querySelector('#navBar');
        const mobileMenu = document.querySelector('#mobileMenu');
        const clearIcon = document.querySelector('#clearIcon');
        
        //hide mobile menu and close icon, show hamburger
        navBar.style.display= 'none';
        mobileMenu.style.display = 'flex';
        clearIcon.style.display = 'none';
    }
    render() { 
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <nav className={classes.NavBar} id='navBar'>               
                        <div className={classes.linksContainer}>                   
                            <ul className={classes.links} id='links'>
                                <li style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                    <div className={classes.clearIcon} style={{ display: 'none' }} id='clearIcon' onClick={this.handleCloseMobile}>               
                                        <ClearIcon />
                                    </div> 
                                    <Link to='/' className={classes.logo}><img src={logo} alt='logo Fun Facts Train Game'/></Link></li>
                                <li><Link to='/funfactstrains/trainoperations'>Train Operations</Link></li>
                                <li><Link to='/funfactstrains/companymanagement'>Company Management</Link></li>
                                <li><Link to='/funfactstrains/buildroute'>Build Route</Link></li>
                                <li><Link to='/funfactstrains/RouteMap'>View Map</Link></li>
                                <li><Link to='/funfactstrains/getpassengers'>Catch Passengers($$$)</Link></li>
                            </ul> 
                        </div>              
                </nav>
                <div className={classes.mobileMenu} id='mobileMenu'>               
                    <MenuIcon onClick={this.handleOpenMobile} id='mobileIcon'/>                     
                </div>
                         
            </div> 
        );
    }
}
 
export default withStyles(styles)(NavBar);