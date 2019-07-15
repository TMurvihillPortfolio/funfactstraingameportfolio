import React, { PureComponent } from 'react';
import {withStyles} from '@material-ui/core';
import NavBar from './NavBar';

const styles = {
    TrainInfoCardCSS: {
        backgroundColor: 'lightsalmon',
        padding: '50px'
    },
    trainNameCSS: {
        marginBottom: '40px',
        borderRadius: '7px'
    },
    trainImageCSS: {
        borderRadius: '7px',
        margin: '40px',
        boxShadow: '10px 10px 15px 4px #333'
    },
    factList: {
        listStyle: 'none'
    },
    factItem: {       
    }
}

class ContractInfoCard extends PureComponent {
    constructor(props) {
        super(props);
        this.getCargoImage = this.getCargoImage.bind(this);
        this.state = {  }
    }
    getCargoImage() {
        console.log('imin');
        console.log(this.props.contractObj.cargo);
        //this.props.contractObj.map(contract => console.log(contract));
    }
    render() { 
        console.log(this.props);

        const { classes, cargoImage } = this.props;
        const { cargo, from, to, offerDate, accepted, contractId, pathName } = this.props.contractObj;
        //const cargoImage = this.getCargoImage();
        // const factList = contractFacts.map(fact => 
        //     <li key={`${classes.trainId}${fact}`} className={classes.factItem}><h4>{fact}</h4></li>);
        return ( 
            // <div className={classes.trainNameCSS}>
            <div >
                <NavBar />
                <h1>{cargo.toUpperCase()}</h1>
                <h1>{from} to {to}</h1>
                {/* <img 
                    src={cargoImage} 
                    alt='engraving of steam contract' 
                    className={classes.trainImageCSS}
                /> */}
                <img 
                    src={cargoImage} 
                    alt='engraving of steam contract' 
                    className={classes.trainImageCSS}
                />
                <h3>Contract Proffered: {offerDate}</h3>
                <h3>{accepted ? "Contract Accepted" : "Not yet accepted."}</h3>
            </div>
         );
    }
}
 
export default withStyles(styles)(ContractInfoCard);