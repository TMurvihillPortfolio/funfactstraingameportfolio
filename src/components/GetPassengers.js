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
        console.log('click');
        document.querySelector('#reward').style.display = 'block';
        document.querySelector('#amount').style.transform = 'scale(2.0)';
        setTimeout(() => {
            document.querySelector('#reward').style.display = 'none';
            document.querySelector('#amount').style.transform = 'scale(1.0)';
            this.props.getPassengerReward();
        }, 8000);       
    }
    render() { 
        return (            
            <div class="wrapper"> 
                <NavBar />              
                {/* <div className="timer">
                    <span></span>    
                </div> */}
                <div className="gameover">Cash: {`${this.props.companyData[0].financials.cash}.00`}</div>
                <h1>CATCH THE PASSENGER ! <span>(click on the person)</span></h1>
                <h2 id='amount'>+ $10.00</h2>
                <input className="input-circle input-circle1" type="radio" id="circle1" onClick={this.handleClick}/>
                <input className="input-circle input-circle2" type="radio" id="circle2" onClick={this.handleClick} />
                <input className="input-circle input-circle3" type="radio" id="circle3" onClick={this.handleClick} />
                <input className="input-circle input-circle4" type="radio" id="circle4" onClick={this.handleClick} />
                <input className="input-circle input-circle5" type="radio" id="circle5" onClick={this.handleClick} />
                <input className="input-circle input-circle6" type="radio" id="circle6" onClick={this.handleClick} />

                <label htmlFor="circle1" className="pajaro pajaro1"><span></span></label>
                <label htmlFor="circle2" className="pajaro pajaro2"><span></span></label>
                <label htmlFor="circle3" className="pajaro pajaro3"><span></span></label>
                <label htmlFor="circle4" className="pajaro pajaro4"><span></span></label>
                <label htmlFor="circle5" className="pajaro pajaro5"><span></span></label>
                <label htmlFor="circle6" className="pajaro pajaro6"><span></span></label>
                <div className="reward" id="reward"></div>
                {/* <div className="sum" id='amount'>+ $10.0</div> */}
                <footer><a href="https://il.linkedin.com/in/eladshechter/">The Game Done By Elad Shechter</a></footer>
            </div>
         );
    }
}
 
export default GetPassengers;