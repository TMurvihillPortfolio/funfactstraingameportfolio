import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import App from './components/App';
import SplashScreen from './components/SplashScreen';

ReactDOM.render(
    <BrowserRouter>   
        <SplashScreen />
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);
