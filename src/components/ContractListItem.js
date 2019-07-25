import React, { Component } from 'react';
      
class ContractListItem extends Component {
    constructor(props) {
        super(props);
        let companyData = JSON.parse(localStorage.getItem('companyData'));
        let contractObj = companyData.contracts.find(contract => contract.id === this.props.contractId);
        
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
                {`${this.state.contractObj.cargo.toUpperCase()} -- ${this.state.contractObj.from} to ${this.state.contractObj.to} ${this.state.contractObj.status === 'started' ? '(in progress)' : ''}`}
            </div>
         );
    }
}
 
export default ContractListItem;