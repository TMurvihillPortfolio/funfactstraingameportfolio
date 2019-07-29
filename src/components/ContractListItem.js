import React, { Component } from 'react';
import { _CITY_ABBR } from '../assets/constants';
      
class ContractListItem extends Component {
    constructor(props) {
        super(props);
        this.handleclick=this.handleclick.bind(this);
    }
    state = {}
    handleclick() {
        this.props.handleContractListItemClick(this.props.contractObj);
    }
    render() { 
        return ( 
            <div onClick={this.handleclick}>
                {`${this.props.contractObj.cargo.toUpperCase()} -- 
                    ${(_CITY_ABBR[this.props.contractObj.from]).toUpperCase()} to 
                    ${(_CITY_ABBR[this.props.contractObj.to]).toUpperCase()} 
                    ${this.props.contractObj.status === 'started' ? '(in progress)' : ''}`}
            </div>
         );
    }
}
 
export default ContractListItem;