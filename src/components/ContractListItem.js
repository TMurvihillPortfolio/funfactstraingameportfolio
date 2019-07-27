import React, { Component } from 'react';
import { _CITY_ABBR } from '../assets/constants';
      
class ContractListItem extends Component {
    constructor(props) {
        super(props);
        let companyData = JSON.parse(localStorage.getItem('companyData'));
        
        this.handleclick=this.handleclick.bind(this);
        this.state = {
           contractObj: companyData.contracts.find(contract => contract.id === this.props.contractId)
        };
    }
    state = {  }
    handleclick() {
        //update data
        this.companyData = JSON.parse(localStorage.getItem('companyData'));
        this.state.contractObj = this.companyData.contracts.find(contract => contract.id === this.props.contractId);
        this.props.handleContractListItemClick(this.state.contractObj);
    }
    render() { 
        if (this.state.contractObj === undefined || this.state.contractObj === null) {return 'Train Completed Run.';}
        this.companyData = JSON.parse(localStorage.getItem('companyData'));
        this.state.contractObj = this.companyData.contracts.find(contract => contract.id === this.props.contractId);
        return ( 
            <div onClick={this.handleclick}>
                {`${this.state.contractObj.cargo.toUpperCase()} -- ${(_CITY_ABBR[this.state.contractObj.from]).toUpperCase()} to ${(_CITY_ABBR[this.state.contractObj.to]).toUpperCase()} ${this.state.contractObj.status === 'started' ? '(in progress)' : ''}`}
            </div>
         );
    }
}
 
export default ContractListItem;