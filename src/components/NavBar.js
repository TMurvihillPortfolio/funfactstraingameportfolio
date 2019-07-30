import React, { PureComponent } from 'react';
import styles from '../styles/NavBarStyles';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.jpg';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { declareOpaqueType } from '@babel/types';

class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.handleDropDownClick=this.handleDropDownClick.bind(this);
        this.closeMenu=this.closeMenu.bind(this);
        this.handleOpenMobile=this.handleOpenMobile.bind(this);
        this.state = { 
            open: false
         }
    }
    handleDropDownClick(e) {
        e.stopPropagation();
        const element = document.querySelector('#selectMenu');
        (element.style.display === 'none') ? 
            element.style.display = 'flex' :
            element.style.display = 'none';  
    }
    closeMenu(e) {
        e.stopPropagation();
        document.querySelector('#selectMenu').style.display = 'none';
    }
    handleOpenMobile() {
        const links = document.querySelector('#links');
        const a_links = [...document.querySelectorAll('#links>a')];
        const selectMenu = document.querySelector('#selectMenu');
        links.style.display= 'flex';
        links.style.flexDirection= 'column';
        links.style.alignItems= 'flex-end';
        links.style.position= 'absolute';
        links.style.width= '166px';
        links.style.right= '0';
        links.style.textAlign= 'right';      
        links.style.top= '0';
        links.style.backgroundColor= 'lightgrey';
        a_links.map(link => link.style.fontSize='12px');
        selectMenu.style.fontSize='12px';
    }
    render() { 
        const { classes } = this.props;
        return (
            <div>
            <nav className={classes.NavBar}>               
                <div className={classes.links} id='links'> 
                    <NavLink className={classes.logo} to='/'><img src={logo} alt='logo Fun Facts Train Game'/></NavLink>   
                    <NavLink to='/funfactstrains/trainoperations'>Train Operations</NavLink>
                    <NavLink to='/funfactstrains/companymanagement'>Company Management</NavLink>
                    <NavLink to='/funfactstrains/buildroute'>Build Route</NavLink>                    
                    <div>
                        <ul className={classes.selectContainer} onClick={this.handleDropDownClick} id='selectMenu'>Buy/Sell Trains
                            <div className={classes.selectItemsShow} id="selectMenu">
                                <li className={classes.selectItems} onClick={this.closeMenu} value="jennylind"><NavLink style={{ fontSize: '16px' }} to='/funfactstrains/trains/jennylind'>Jenny Lind</NavLink> </li>
                                <li className={classes.selectItems} onClick={this.closeMenu} value="illinois201"><NavLink style={{ fontSize: '16px' }} to='/funfactstrains/trains/illinoiscentral201'>Ill Cent 201</NavLink> </li>
                                <li className={classes.selectItems} onClick={this.closeMenu} value="jennylind"><NavLink style={{ fontSize: '16px' }} to='/funfactstrains/trains/jupiter'>Jupiter</NavLink> </li>                                
                            </div>
                        </ul>
                    </div>
                    
                </div>
                
            </nav>
            <div className={classes.mobileMenu}>
                <MenuIcon onClick={this.handleOpenMobile}/>   
            </div>
            </div> 
        );
    }
}
 
export default withStyles(styles)(NavBar);