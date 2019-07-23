import React, { PureComponent } from 'react';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
import ContractInfoCard from './ContractInfoCard';
import TrainOperations from './TrainOperations';
import CompanyManagement from './CompanyManagement';
import BuildRoute from './BuildRoute';
import { _TRAIN_DETAILS } from '../assets/constants';

let companyData; 

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    companyData = JSON.parse(localStorage.getItem('companyData'));
    let { contracts } = companyData;
    const trains = _TRAIN_DETAILS;
    const getTrain = props => {
      let name = props.match.params.trainpathname;
      let trainIndex = trains.findIndex(train => train.pathName === name);
      return <TrainInfoCard trainObj={trains[trainIndex]} history={props.history} />
    }
    const getContract = routeProps => {
      //refresh contract data
      contracts = JSON.parse(localStorage.getItem('companyData')).contracts;
      
      //match pathname to contract data
      const name = routeProps.match.params.contractpathname;
      const contractIndex = contracts.findIndex(contract => contract.pathName == name);
      
      //call contract info screen with contractObj
      return <ContractInfoCard contractObj={contracts[contractIndex]} history={routeProps.history}/>
    }
        
    return ( 
      <div className="App">
          <Switch>
            <Route exact path='/' render={(routeProps) => <TrainOperations {...routeProps} />}/>       
            <Route exact path='/funfactstrains' render={(routeProps) => <TrainOperations {...routeProps} />}/>       
            <Route exact path='/funfactstrains/trainoperations' render={(routeProps) => <TrainOperations {...routeProps}/>}/>        
            <Route exact path='/funfactstrains/companymanagement' render={(routeProps) => <CompanyManagement {...routeProps}/>}/>       
            <Route exact path='/funfactstrains/buildroute' render={(routeProps) => <BuildRoute {...routeProps}/>}/>       
            <Route exact path='/funfactstrains/trains/:trainpathname' render={getTrain}/>     
            <Route exact path='/funfactstrains/contracts/:contractpathname' render={getContract}/>
          </Switch>
      </div>
     );
  }
}
 
export default App;
