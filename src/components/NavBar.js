import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBarStyles';
import logo from '../img/logo.jpg';
import {withStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.handleDropDownClick=this.handleDropDownClick.bind(this);
        this.closeMenu=this.closeMenu.bind(this);
        this.handleOpenMobile=this.handleOpenMobile.bind(this);
        this.handleCloseMobile=this.handleCloseMobile.bind(this);
        this.state = { 
            open: false
         }
    }
    handleDropDownClick(e) {
        console.log('indropdown');
        e.stopPropagation();
        const element = document.querySelector('#selectItems');
        if (element.style.display === 'flex') {
            element.style.display = 'none';
            return; 
        }
        element.style.display = 'flex';
    }
    closeMenu(e) {
        e.stopPropagation();
        document.querySelector('#selectItems').style.display = 'none';
    }
    handleOpenMobile(e) {
        console.log('click', e.target);
        
        const links = document.querySelector('#links');
        const navBar = document.querySelector('#navBar');
        const a_links = [...document.querySelectorAll('#links>a')];
        const mobileMenu = document.querySelector('#mobileMenu');
        const clearIcon = document.querySelector('#clearIcon');
        
        // window.onclick = function(e){
        //     if(e.target.id !== 'links' && e.target.id !== mobileIcon ){
        //         links.style.display = 'none';
        //         mobileMenu.style.display = 'flex';
        //         //window.location.reload(); //NOT YET IMPLEMENTED -- this is a hack to fix mobile menu not working on second click
        //     }
        // };
        navBar.style.display= 'flex';
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
        mobileMenu.style.display = 'none';
        clearIcon.style.display = 'block';
    }
    handleCloseMobile(e) {
        console.log('click', e.target);
        
        const links = document.querySelector('#links');
        const navBar = document.querySelector('#navBar');
        const a_links = [...document.querySelectorAll('#links>a')];
        const mobileMenu = document.querySelector('#mobileMenu');
        const clearIcon = document.querySelector('#clearIcon');
        
        // window.onclick = function(e){
        //     if(e.target.id !== 'links' && e.target.id !== mobileIcon ){
        //         links.style.display = 'none';
        //         mobileMenu.style.display = 'flex';
        //         //window.location.reload(); //NOT YET IMPLEMENTED -- this is a hack to fix mobile menu not working on second click
        //     }
        // };
        navBar.style.display= 'none';
        // links.style.flexDirection= 'column';
        // links.style.alignItems= 'flex-end';
        // links.style.position= 'absolute';
        // links.style.right= '0';
        // links.style.textAlign= 'right';      
        // links.style.top= '0';
        // links.style.backgroundColor= 'rgb(0,128,128)';
        // links.style.backgroundColor= 'rgba(0,128,128,0.8)';
        // links.style.borderRadius = '7px';
        // links.style.padding = '5px 0 5px 5px';
        // a_links.map(link => link.style.fontSize='12px');
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
                                <li><Link to='/' className={classes.logo}><img src={logo} alt='logo Fun Facts Train Game'/></Link></li>
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
                <div className={classes.clearIcon} style={{ display: 'none' }} id='clearIcon' onClick={this.handleCloseMobile}>               
                    <ClearIcon />
                </div>          
            </div> 
        );
    }
}
 
export default withStyles(styles)(NavBar);