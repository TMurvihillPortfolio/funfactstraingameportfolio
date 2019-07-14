import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles={};
class ContractList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <ul>
                    <li>contract1</li>
                    <li>contract2</li>
                    <li>contract3</li>
                    <li>contract4</li>
                    <li>contract5</li>
                </ul>
            </div>
         );
    }
}
 
export default withStyles(styles)(ContractList);