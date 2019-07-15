import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = {};
class Contract extends Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state = {
           
        };
      }
    state = {  }

    handleClick() {
        console.log('contract', this.props);
        this.props.handleContractDialogOpen(this.props.contractObj);
        //this.props.history.push('/');
    }
    render() { 
        const listView = this.props;
        const contract = this.props.contractObj;
        
        return ( 
            <div onClick={this.handleClick}>
                {listView ? `${contract.cargo.toUpperCase()} -- ${contract.from} to ${contract.to}` :
                    
                    //fullView goes here
                    <div>
                        'full view'
                    </div>
                
                }
                
            </div>
         );
    }
}
 
export default withStyles(styles)(Contract);