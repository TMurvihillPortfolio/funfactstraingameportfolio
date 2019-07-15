import React, { PureComponent } from 'react';
import '../css/App.css';
import { Route, Switch } from 'react-router-dom';
import TrainInfoCard from './TrainInfoCard';
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
    const trains = companyData[0].trains;
    let trainName = 'jennylind';
    const getTrain = props => {
      let name = props.match.params.trainpathname;
      let trainIndex = trains.findIndex(train => train.pathName === name);
      return <TrainInfoCard trainObj={trains[trainIndex]} history={props.history} />
    }
    
    //let trainObj = trains.find(train => train.pathName === this.props.match.params.trainPathName);

    return ( 
      <div className="App">
          <Switch>
            <Route exact path='/' render={() => <TrainOperations />}/>        
            <Route exact path='/funfactstrains/trainoperations' render={() => <TrainOperations />}/>        
            <Route exact path='/funfactstrains/companymanagement' render={(routeProps) => <CompanyManagement {...routeProps}/>}/>       
            {/* <Route exact path='/funfactstrains/trains/:trainpathname' render={(routeProps) => <TrainInfoCard trainPathName={routeProps.match.params.trainpathname} trainObj={trains[0]} />}/>      */}
            <Route exact path='/funfactstrains/trains/:trainpathname' render={getTrain}/>     
            {/* <Route exact path='/funfactstrains/trains/:trainpathname' render={(routeProps) => <TrainInfoCard name="JennyLind" trainObj={trains[1]} />}/>        */}
          </Switch>
      </div>
     );
  }
}
 
export default App;
