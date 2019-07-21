import React, { Component } from 'react';

class TrainListItem extends Component {
    constructor(props) {
        super(props);
        this.handleclick=this.handleclick.bind(this);
        this.state = {};
      }
    state = {  }

    handleclick() {
        this.props.handleTrainDialogOpen(this.props.trainObj);
    }
    render() { 
        const train = this.props.trainObj;
        return ( 
            <div onClick={this.handleclick}>
                {train.trainName.toUpperCase()}
            </div>
         );
    }
}
 
export default TrainListItem;