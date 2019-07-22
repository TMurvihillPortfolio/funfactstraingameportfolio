import React, { Component } from 'react';

class ContractList extends Component {
    constructor(props) {
        super(props);
        this.handleclick=this.handleclick.bind(this);
        this.state = {};
      }
    state = {  }

    handleclick() {
        this.props.handleContractDialogOpen(this.props.contractObj);
    }
    render() { 
        const contract = this.props.contractObj;
        console.log('conlist', this.props);
        return ( 
            <div onClick={this.handleclick}>
                {`${contract.cargo.toUpperCase()} -- ${contract.from} to ${contract.to}`}
            </div>
         );
    }
}
 
export default ContractList;