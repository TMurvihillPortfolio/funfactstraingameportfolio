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
        marginLeft: '-15px'
    },
    logo: {
        height: '100%',
        '& img': {
            height: '100%',
            width: '100px',
            // margin: '-25px 15px -25px -23px'
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
            transition: 'all 1s ease-in-out'
            
        },
        '& a:hover': {
            textDecoration: 'underline'
        }      
    },
    selectContainer: {
        listStyle: 'none',
        fontSize: '20px',
        transform: 'translateY(-15px)',
        cursor: 'pointer',
        position: 'relative',
        marginRight: '25px',
        marginLeft: '-25px',
        color: 'whitesmoke',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    selectItemsShow: {
        display: 'none',
        flexDirection: 'column',
        position: 'absolute',
        right: '0',
        backgroundColor: '#c79382',
        width: '140px',
        borderRadius: '4px',
        padding: '5px 7px'       
    },
    selectItems: { 
        fontSize: '14px',
        border: 'none',
        '&:hover': {
            border: 'none'
        }
    }
}

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
                    <NavLink className={classes.logo} to='/'><img src={logowText} alt='logo Fun Facts Train Game'/></NavLink>   
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