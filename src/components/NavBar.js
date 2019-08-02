import React, { PureComponent } from 'react';
import styles from '../styles/NavBarStyles';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.jpg';
import {withStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
        const selectMenu = document.querySelector('#selectMenu');
        const mobileMenu = document.querySelector('#mobileMenu');
        //hide on outside click
        // document.onclick = function(e){
        //     if(e.target.id !== 'links' && e.target.id !== 'selectMenu'){
        //         links.style.display = 'none';
        //         mobileMenu.style.display = 'flex';
        //         //window.location.reload(); //NOT YET IMPLEMENTED -- this is a hack to fix mobile menu not working on second click
        //     }
        // };
        navBar.style.display= 'flex';
        console.dir(links.style);
        links.style.flexDirection= 'column';
        links.style.alignItems= 'flex-end';
        links.style.position= 'absolute';
        links.style.right= '0';
        links.style.textAlign= 'right';      
        links.style.top= '0';
        links.style.backgroundColor= 'rgb(0,128,128,0.8)';
        links.style.borderRadius = '7px';
        a_links.map(link => link.style.fontSize='12px');
        selectMenu.style.fontSize='14px';
        selectMenu.style.marginLeft = '0';
        selectMenu.style.marginRight = '13px';
        selectMenu.style.marginTop = '0';
        selectMenu.style.transform = 'none';
        mobileMenu.style.display = 'none';
    }
    render() { 
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <nav className={classes.NavBar} id='navBar'>               
                {/* <div className={classes.links} id='links'>  */}
                    {/* <NavLink className={classes.logo} to='/'><img src={logo} alt='logo Fun Facts Train Game'/></NavLink>   
                    <NavLink to='/funfactstrains/trainoperations'>Train Operations</NavLink>
                    <NavLink to='/funfactstrains/companymanagement'>Company Management</NavLink>
                    <NavLink to='/funfactstrains/buildroute'>Build Route</NavLink>                     */}
                    <div className={classes.linksContainer}>
                        <ul className={classes.links} id='links'>
                            <li><a href='/' className={classes.logo}><img src={logo} alt='logo Fun Facts Train Game'/></a></li>
                            <li><a href='/funfactstrains/trainoperations'>Train Operations</a></li>
                            <li><a href='/funfactstrains/companymanagement'>Company Management</a></li>
                            <li><a href='/funfactstrains/buildroute'>Build Route</a></li>
                            <li><a href='/funfactstrains/getpassengers'>Catch Passengers($$$)</a></li>
                            <li>
                                <ul className={classes.selectContainer} onClick={this.handleDropDownClick} id='selectMenu'>Buy/Sell Trains
                                    <div className={classes.selectItemsShow} id="selectItems">
                                        <li className={classes.selectItems} onClick={this.closeMenu} value="jennylind"><a style={{ fontSize: '16px' }} href='/funfactstrains/trains/jennylind'>Jenny Lind</a> </li>
                                        <li className={classes.selectItems} onClick={this.closeMenu} value="illinois201"><a style={{ fontSize: '16px' }} href='/funfactstrains/trains/illinoiscentral201'>Ill Cent 201</a></li>
                                        <li className={classes.selectItems} onClick={this.closeMenu} value="jennylind"><a style={{ fontSize: '16px' }} href='/funfactstrains/trains/jupiter'>Jupiter</a> </li>                                
                                    </div>
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                    
                {/* </div> */}
                
            </nav>
            <div className={classes.mobileMenu} id='mobileMenu'>
                <MenuIcon onClick={this.handleOpenMobile} id='mobileIcon'/>   
            </div>
            </div> 
        );
    }
}
 
export default withStyles(styles)(NavBar);