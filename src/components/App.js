import React, { Component } from 'react';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
import ContractInfoCard from './ContractInfoCard';
import TrainOperations from './TrainOperations';
import CompanyManagement from './CompanyManagement';
import BuildRoute from './BuildRoute';
import { _TRAIN_DETAILS, _INITIAL_COMPANYDATA } from '../assets/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.buySellTrain=this.buySellTrain.bind(this);
    this.state = { 
      companyData: JSON.parse(localStorage.getItem('companyData')) || _INITIAL_COMPANYDATA,
      activeTrains: JSON.parse(localStorage.getItem('funFactsActiveTrains')) || null
    }
  }
  buySellTrain(trainObj, purchased) {
    //initialize variables
    const { trainCost, trainId } = trainObj;
    const { companyData } = this.state;
    if (!purchased) {
      console.log('inifstatebef', companyData);
        //check if enough money
        if (companyData[0].financials.cash >= trainCost) {
            let newArray = [...this.state.companyData];
            console.log('newarray', newArray);
            newArray[0].financials.cash -= trainCost;
            newArray[0].trains.push({ id: trainId });
            this.setState({ companyData: newArray });
            console.log('inifstateaft', this.state);
        } else {
            return alert('Not enough cash available to purchase train.');
        }
    } else {
        let newArray = [...this.state.companyData];
        newArray[0].financials.cash += trainCost;
        console.log('elsenewarray', newArray[0].trains[0].id);
        let newTrainsArray = newArray[0].trains.filter(train => train.id !== trainId);
        newArray[0].trains = newTrainsArray;
        console.log('elsenewarrayafter', newArray);
        this.setState({ companyData : newArray });
    }
  }
  render() {
    console.log(this.state.companyData[0]);
    let { contracts } = this.state.companyData[0];
    let companyTrains; 
    this.state.companyData[0].trains === undefined ? companyTrains = [] : companyTrains = [...this.state.companyData[0].trains];
    const trains = _TRAIN_DETAILS;
    console.log('app', this.state.companyData);
    console.log('appcomptrains', companyTrains);
    const getTrain = props => {
      let name = props.match.params.trainpathname;
      let trainIndex = trains.findIndex(train => train.pathName === name);
      return <TrainInfoCard trainObj={trains[trainIndex]} companyTrains={companyTrains} buySellTrain={this.buySellTrain} history={props.history} />
    }
    const getContract = routeProps => {
      //match pathname to contract data
      const name = routeProps.match.params.contractpathname;
      const contractIndex = contracts.findIndex(contract => contract.pathName == name);
      
      //call contract info screen with contractObj
      return <ContractInfoCard contractObj={contracts[contractIndex]} history={routeProps.history}/>
    }
        
    return ( 
      <div className="App">
          <Switch>
            <Route exact path='/' render={(routeProps) => <TrainOperations companyData={this.state.companyData} {...routeProps} />}/>       
            <Route exact path='/funfactstrains' render={(routeProps) => <TrainOperations companyData={this.state.companyData} {...routeProps} />}/>       
            <Route exact path='/funfactstrains/trainoperations' render={(routeProps) => <TrainOperations companyData={this.state.companyData} {...routeProps}/>}/>        
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
