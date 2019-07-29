import React, { Component } from 'react';
import uuid from 'uuid';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
import ContractInfoCard from './ContractInfoCard';
import TrainOperations from './TrainOperations';
import CompanyManagement from './CompanyManagement';
import BuildRoute from './BuildRoute';
import { _TRAIN_DETAILS, _INITIAL_COMPANYDATA } from '../assets/constants';
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
    //add contract offer to state
    const newCompanyData = getContractOffer(this.state.companyData);
    this.updateCompanyData(newCompanyData);

    //call add new contract every 6 seconds
    const updateData = () => (
      setInterval(
        () => getContractOffer(this.state.companyData), 180000
      ), this.updateCompanyData(updateData)
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
            //update cash
            let newArray = [...this.state.companyData];
            newArray[0].financials.cash -= trainCost;
            //add train to state
            newArray[0].trains.push({ id: trainId });
            this.updateCompanyData(newArray);
        } else {
            return alert('Not enough cash available to purchase train.');
        }
    //sell train    
    } else {
        //update cash
        const newArray = [...this.state.companyData];
        newArray[0].financials.cash += trainCost;
        //remove train from state
        const newTrainsArray = newArray[0].trains.filter(train => train.id !== trainId);
        newArray[0].trains = newTrainsArray;
        this.updateCompanyData(newArray);
    }
  }
  startTrain(contractObj, routeHistory) {
    //copy state
    const activeTrains = [...this.state.activeTrains] || [];
    //create new object
    const newObj = {
        id: uuid(),
        contractId: contractObj.id,
        top: 8,
        right: 0,
        lengthOfTrip: getLengthOfTrip(contractObj.from, contractObj.to)
    }
    //update state with new object
    activeTrains.push(newObj);       
    this.updateActiveTrains(activeTrains);
    //back to train operations
    routeHistory.push('/funfactstrains/trainoperations');                  
  } 
  updateContract(contractObj) {
    //copy state
    const companyDataCopy = [...this.state.companyData];
    const compContracts = companyDataCopy[0].contracts;
    //create new object
    const newContractArray = compContracts.map(contract => {
      let returnValue = {...contract};   
      if (contract.id === contractObj.id) {
        returnValue = contractObj;
      }    
      return returnValue
    });
    //update state with new object
    companyDataCopy[0].contracts = newContractArray;
    this.updateCompanyData(companyDataCopy);
  }
  updateCompanyData(companyData) {
    this.setState({ companyData : companyData });
  }
  updateActiveTrains(activeTrains) {
    this.setState({ activeTrains : activeTrains });
  }
  componentWillUnmount() {
    syncLocalStorageActiveTrains(JSON.stringify(this.state.companyData));
    syncLocalStorageCompanyData(JSON.stringify(this.state.activeTrains));
  }
  render() {
    let companyTrains, contracts, activeTrains;
    this.state.companyData[0].trains === undefined ? companyTrains = [] : companyTrains = [...this.state.companyData[0].trains];
    this.state.companyData[0].contracts === undefined ? contracts = [] : contracts = [...this.state.companyData[0].contracts];
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
