import React, { PureComponent } from 'react';
import NavBar from './NavBar';

class CompanyManagement extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <NavBar />
                <h1>CompanyManagement</h1>
            </div>
         );
    }
}
 
export default CompanyManagement;