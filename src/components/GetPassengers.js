import React, { Component } from 'react';
import '../css/GetPassengersCSS.css';
import NavBar from './NavBar';

class GetPassengers extends Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state = {  }
    }
    handleClick() {
        document.querySelector('#reward').style.display = 'block';
        document.querySelector('#cash').innerText = 
            'Caught!! + $10.00'
        ;
        setTimeout(() => {           
            this.props.getPassengerReward();
            document.querySelector('#reward').style.display = 'none';
            document.querySelector('#cash').innerText = 
                `$${this.props.companyData[0].financials.cash}.00`
            ;
        }, 8000);       
    }
    render() { 
        return (            
            <div class="wrapper"> 
                <NavBar /> 
                <div className="currentCash" id='cash'>Cash: {`$${this.props.companyData[0].financials.cash}.00`}</div>
                <h1>CATCH THE PASSENGERS !</h1>
                <h2 id='amount'>earn $10.00</h2>
                <input className="input-circle input-circle1" type="radio" id="circle1" onClick={this.handleClick}/>
                <input className="input-circle input-circle2" type="radio" id="circle2" onClick={this.handleClick} />
                <input className="input-circle input-circle3" type="radio" id="circle3" onClick={this.handleClick} />
                <input className="input-circle input-circle4" type="radio" id="circle4" onClick={this.handleClick} />
                <input className="input-circle input-circle5" type="radio" id="circle5" onClick={this.handleClick} />
                <input className="input-circle input-circle6" type="radio" id="circle6" onClick={this.handleClick} />

                <label htmlFor="circle1" className="passenger passenger1"></label>
                <label htmlFor="circle2" className="passenger passenger2"></label>
                <label htmlFor="circle3" className="passenger passenger3"></label>
                <label htmlFor="circle4" className="passenger passenger4"></label>
                <label htmlFor="circle5" className="passenger passenger5"></label>
                <label htmlFor="circle6" className="passenger passenger6"></label>
                <div className="reward" id="reward"></div>
                <footer className='footer'>Motion courtesy of <a href="https://il.linkedin.com/in/eladshechter/">Elad Shechter</a></footer>
            </div>
         );
    }
}
 
export default GetPassengers;