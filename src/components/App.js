import React, { Component } from 'react';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
import ContractInfoCard from './ContractInfoCard';
import TrainOperations from './TrainOperations';
import CompanyManagement from './CompanyManagement';
import BuildRoute from './BuildRoute';
import { _TRAIN_DETAILS, _INITIAL_COMPANYDATA } from '../assets/constants';
import { getContractOffer } from '../assets/helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.buySellTrain=this.buySellTrain.bind(this);
    this.updateCompanyData=this.updateCompanyData.bind(this);
    this.updateContract=this.updateContract.bind(this);
    this.state = { 
      companyData: JSON.parse(localStorage.getItem('companyData')) || _INITIAL_COMPANYDATA,
      activeTrains: JSON.parse(localStorage.getItem('funFactsActiveTrains')) || null
    }
  }
  componentDidMount() {
    const newCompanyData = getContractOffer(this.state.companyData);
    setInterval(() => getContractOffer(this.state.companyData), 180000)
    this.updateCompanyData(newCompanyData);
  }
  buySellTrain(trainObj, purchased) {
    //initialize variables
    const { trainCost, trainId } = trainObj;
    const { companyData } = this.state;
    if (!purchased) {
       //check if enough money
        if (companyData[0].financials.cash >= trainCost) {
            //purchase train-update cash
            let newArray = [...this.state.companyData];
            newArray[0].financials.cash -= trainCost;
            //add train to state
            newArray[0].trains.push({ id: trainId });
            this.updateCompanyData(newArray);
        } else {
            return alert('Not enough cash available to purchase train.');
        }
    } else {
        //sell train-update cash
        const newArray = [...this.state.companyData];
        newArray[0].financials.cash += trainCost;
        //remove train from state
        const newTrainsArray = newArray[0].trains.filter(train => train.id !== trainId);
        newArray[0].trains = newTrainsArray;
        this.updateCompanyData(newArray);
    }
  }
  updateCompanyData(companyData) {
    this.setState({ companyData : companyData });
  }
  updateContract(contractObj) {
    const companyDataCopy = [...this.state.companyData];
    const compContracts = companyDataCopy[0].contracts;
    const newContractArray = compContracts.map(contract => {
      let returnValue = {...contract};
    
      if (contract.id == contractObj.id) {
        returnValue = contractObj;
      }
    
      return returnValue
    });
    companyDataCopy[0].contracts = newContractArray;
    this.updateCompanyData(companyDataCopy);
  }
  render() {
    let companyTrains;
    let contracts;
    this.state.companyData[0].trains === undefined ? companyTrains = [] : companyTrains = [...this.state.companyData[0].trains];
    this.state.companyData[0].contracts === undefined ? contracts = [] : contracts = [...this.state.companyData[0].contracts];
    const trains = _TRAIN_DETAILS;
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
      return <ContractInfoCard contractObj={contracts[contractIndex]} updateContract={this.updateContract} history={routeProps.history}/>
    }
    return ( 
      <div className="App">
          <Switch>
            <Route exact path='/' render={(routeProps) => <TrainOperations companyData={this.state.companyData} {...routeProps} updateCompanyData={this.updateCompanyData}/>}/>       
            <Route exact path='/funfactstrains' render={(routeProps) => <TrainOperations companyData={this.state.companyData} {...routeProps} updateCompanyData={this.updateCompanyData}/>}/>       
            <Route exact path='/funfactstrains/trainoperations' render={(routeProps) => <TrainOperations companyData={this.state.companyData} {...routeProps} updateCompanyData={this.updateCompanyData}/>}/>        
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
