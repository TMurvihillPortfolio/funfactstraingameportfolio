import React from 'react';
import '../css/App.css';
import TrainInfoCard from './TrainInfoCard';
import trainsList from '../assets/trainslist';

function App() {
  console.log(trainsList);
  return (
    
    <div className="App">
      <h1>'Just the Facts' Train Game</h1>
        <TrainInfoCard trainObject = {trainsList[0]}/>
    </div>
  );
}

export default App;
