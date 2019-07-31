import React, { Component } from 'react';
import uuid from 'uuid';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
import ContractInfoCard from './ContractInfoCard';
import TrainOperations from './TrainOperations';
import CompanyManagement from './CompanyManagement';
import BuildRoute from './BuildRoute';
import 
  { 
    _TRAIN_DETAILS, 
    _INITIAL_COMPANYDATA, 
    _CONTRACTOFFER_INTERVAL 
  } 
  from '../assets/constants'
;
import 
  { 
    getContractOffer, 
    getLengthOfTrip,
    syncLocalStorageActiveTrains,
    syncLocalStorageCompanyData 
  } 
  from '../assets/helpers'
;

class App extends Component {
  constructor(props) {
    super(props);
    this.buySellTrain=this.buySellTrain.bind(this);
    this.startTrain=this.startTrain.bind(this);
    this.updateCompanyData=this.updateCompanyData.bind(this);
    this.updateContract=this.updateContract.bind(this);
    this.updateActiveTrains=this.updateActiveTrains.bind(this);
    this.state = { 
      companyData: JSON.parse(localStorage.getItem('companyData')) || _INITIAL_COMPANYDATA,
      activeTrains: JSON.parse(localStorage.getItem('funFactsActiveTrains')) || []
    }
  }
  componentDidMount() {
    //update local storage on window close
    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // sync local storage
      syncLocalStorageActiveTrains(this.state.activeTrains);
      syncLocalStorageCompanyData(this.state.companyData);      
    });

    //add contract offer to state
    let newCompanyData = getContractOffer(this.state.companyData);    
    this.updateCompanyData(newCompanyData);

    //call add new contract offer at interval set in the constants file
    setInterval(() => { 
        newCompanyData = getContractOffer(this.state.companyData);
        this.updateCompanyData(newCompanyData); 
      }, _CONTRACTOFFER_INTERVAL
    );
  }
  buySellTrain(trainObj, purchased) {
    //initialize variables
    const { trainCost, trainId } = trainObj;
    const { companyData } = this.state;
    //buy train
    if (!purchased) {
       //check if enough money
        if (companyData[0].financials.cash >= trainCost) {
            //copy state
            let newArray = [...this.state.companyData];
            //update cash
            newArray[0].financials.cash -= trainCost;
            //add train
            newArray[0].trains.push({ id: trainId });
            //update state
            this.updateCompanyData(newArray);
        } else {
            return alert('Not enough cash available to purchase train.');
        }
    //sell train    
    } else {
      //copy state
      const newArray = [...this.state.companyData];
      //update cash
      newArray[0].financials.cash += trainCost;
      //remove train
      newArray[0].trains = newArray[0].trains.filter(train => train.id !== trainId);
      //update state
      this.updateCompanyData(newArray);
    }
  }
  startTrain(contractObj, routeHistory) {   
    //create new active train
    const newActiveTrain = {
        id: uuid(),
        contractId: contractObj.id,
        top: 8,
        right: 0,
        lengthOfTrip: getLengthOfTrip(contractObj.from, contractObj.to)
    }
    //copy state
    const activeTrains = [...this.state.activeTrains] || [];
    //add new active train
    activeTrains.push(newActiveTrain);
    //update state       
    this.updateActiveTrains(activeTrains);
    //back to train operations
    routeHistory.push('/funfactstrains/trainoperations');                  
  } 
  updateCompanyData(companyData) {
    this.setState({ companyData : companyData });
  }
  updateActiveTrains(activeTrains) {
    this.setState({ activeTrains : activeTrains });
  }
  updateContract(contractObj) {
    //copy state
    const companyDataCopy = [...this.state.companyData];
    const compContracts = companyDataCopy[0].contracts;
    //create new contracts object
    const newContractArray = compContracts.map(contract => {
      let returnValue = {...contract};   
      if (contract.id === contractObj.id) {
        returnValue = contractObj;
      }    
      return returnValue
    });
    //update contracts with new contracts object
    companyDataCopy[0].contracts = newContractArray;
    //update state
    this.updateCompanyData(companyDataCopy);
  } 
  render() {
    const companyData = this.state.companyData[0];
    let companyTrains, contracts, activeTrains;
    companyData.trains === undefined ? companyTrains = [] : companyTrains = [...companyData.trains];
    companyData.contracts === undefined ? contracts = [] : contracts = [...companyData.contracts];
    this.state.activeTrains === undefined ? activeTrains = [] : activeTrains = [...this.state.activeTrains];
    
    const trains = _TRAIN_DETAILS;
    const getTrain = props => {
      let name = props.match.params.trainpathname;
      let trainIndex = trains.findIndex(train => train.pathName === name);
      return <TrainInfoCard 
                trainObj={trains[trainIndex]} 
                companyTrains={companyTrains} 
                buySellTrain={this.buySellTrain} 
                history={props.history} 
              />
      ;
    }
    const getContract = routeProps => {
      //match pathname to contract data
      const name = routeProps.match.params.contractpathname;
      const contractIndex = contracts.findIndex(contract => contract.pathName == name);
      
      //call contract info screen with contractObj
      return <ContractInfoCard 
                contractObj={contracts[contractIndex]} 
                updateContract={this.updateContract} 
                startTrain={this.startTrain} 
                history={routeProps.history}
              />
      ;
    }
    return ( 
      <div className="App">
          <Switch>
            <Route exact path='/' render={(routeProps) => <TrainOperations companyData={this.state.companyData} activeTrains={this.state.activeTrains} updateActiveTrains={this.updateActiveTrains} {...routeProps} updateCompanyData={this.updateCompanyData}/>}/>       
            <Route exact path='/funfactstrains' render={(routeProps) => <TrainOperations companyData={this.state.companyData} activeTrains={this.state.activeTrains} updateActiveTrains={this.updateActiveTrains} {...routeProps} updateCompanyData={this.updateCompanyData}/>}/>       
            <Route exact path='/funfactstrains/trainoperations' render={(routeProps) => <TrainOperations companyData={this.state.companyData} activeTrains={activeTrains} updateActiveTrains={this.updateActiveTrains} {...routeProps} updateCompanyData={this.updateCompanyData}/>}/>        
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
