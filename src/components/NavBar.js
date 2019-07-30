import React, { PureComponent } from 'react';
import styles from '../styles/NavBarStyles';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.jpg';
import {withStyles} from '@material-ui/core';

class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.handleDropDownClick=this.handleDropDownClick.bind(this);
        this.closeMenu=this.closeMenu.bind(this);
        this.state = {  }
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
    render() { 
        const { classes } = this.props;
        return ( 
            <nav className={classes.NavBar}>               
                <div className={classes.links}> 
                    <NavLink className={classes.logo} to='/'><img src={logo} alt='logo Fun Facts Train Game'/></NavLink>   
                    <NavLink to='/funfactstrains/trainoperations'>Train Operations</NavLink>
                    <NavLink to='/funfactstrains/companymanagement'>Company Management</NavLink>
                    <NavLink to='/funfactstrains/buildroute'>Build Route</NavLink>                    
                    <div>
                        <ul className={classes.selectContainer} onClick={this.handleDropDownClick}>Buy/Sell Trains
                            <div className={classes.selectItemsShow} id="selectMenu">
                                <li className={classes.selectItems} onClick={this.closeMenu} value="jennylind"><NavLink style={{ fontSize: '16px' }} to='/funfactstrains/trains/jennylind'>Jenny Lind</NavLink> </li>
                                <li className={classes.selectItems} onClick={this.closeMenu} value="illinois201"><NavLink style={{ fontSize: '16px' }} to='/funfactstrains/trains/illinoiscentral201'>Ill Cent 201</NavLink> </li>
                                <li className={classes.selectItems} onClick={this.closeMenu} value="jennylind"><NavLink style={{ fontSize: '16px' }} to='/funfactstrains/trains/jupiter'>Jupiter</NavLink> </li>                                
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default withStyles(styles)(NavBar);