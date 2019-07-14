import React, { PureComponent } from 'react';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
import TrainOperations from './TrainOperations';
import NavBar from './NavBar';
import CompanyManagement from './CompanyManagement';
import trainsList from '../assets/trainslist';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    console.log(trainsList[0]);
    console.log(trainsList);
    console.log(trainsList[0].trains[0]);
    return ( 
      <div className="App">
          <Switch>
            <Route exact path='/' render={() => <TrainOperations />}/>        
            <Route exact path='/funfactstrains/trainoperations' render={() => <TrainOperations />}/>        
            <Route exact path='/funfactstrains/companymanagement' render={() => <CompanyManagement />}/>       
            <Route exact path='/funfactstrains/illinois201' render={() => <TrainInfoCard trainObj={trainsList[0].trains[0]} />}/>       
            <Route exact path='/funfactstrains/jennylind' render={() => <TrainInfoCard trainName="Jenny Lind" trainObj={trainsList[0].trains[1]} />}/>       
          </Switch>
      </div>
     );
  }
}
 
export default App;
