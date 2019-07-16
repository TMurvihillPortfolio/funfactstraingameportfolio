import React, { PureComponent } from 'react';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
import ContractInfoCard from './ContractInfoCard';
import TrainOperations from './TrainOperations';
import NavBar from './NavBar';
import CompanyManagement from './CompanyManagement';
import companyData from '../assets/trainslist';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const { trains, contracts } = companyData[0];
    const getTrain = props => {
      let name = props.match.params.trainpathname;
      let trainIndex = trains.findIndex(train => train.pathName === name);
      return <TrainInfoCard trainObj={trains[trainIndex]} history={props.history} />
    }
    const getContract = routeProps => {
      const name = routeProps.match.params.contractpathname;
      const contractIndex = contracts.findIndex(contract => contract.pathName === name);
      return <ContractInfoCard contractObj={contracts[contractIndex]} history={routeProps.history}/>
    }
    
    return ( 
      <div className="App">
          <Switch>
            <Route exact path='/' render={(routeProps) => <TrainOperations {...routeProps} />}/>        
            <Route exact path='/funfactstrains/trainoperations' render={(routeProps) => <TrainOperations {...routeProps} />}/>        
            <Route exact path='/funfactstrains/companymanagement' render={(routeProps) => <CompanyManagement {...routeProps}/>}/>       
            <Route exact path='/funfactstrains/trains/:trainpathname' render={getTrain}/>     
            <Route exact path='/funfactstrains/contracts/:contractpathname' render={getContract}/>
          </Switch>
      </div>
     );
  }
}
 
export default App;
