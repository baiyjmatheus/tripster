import React, { Component } from 'react';

class Overview extends Component {

  render() {

   const completed = {
      color: 'green'
    }

    const ongoing = {
      color : 'yellow',
    }

    function styleThis(props, step){
      if(props === step){
        return ongoing
      }
    }

    console.log("this is the current step: ", this.props.currentStep)

    return (

       <aside id="summary" className="full-height">
                <i className="fas fa-map-marker-alt"></i>

                  <div id="progress">
                    <ul id="steps">
                       { this.props.startStep ? (<i className="fas fa-user-friends" style={completed}></i>) : (<i className="fas fa-user-friends" style={styleThis(this.props.currentStep,'start')}></i>) }
                       {this.props.flightStatus ? (<i className="fas fa-plane-departure"  style={completed}></i>) : (<i className="fas fa-plane-departure" style={styleThis(this.props.currentStep,'flights')}></i>)}
                       {this.props.hotelStatus ? (<i className="fas fa-bed" style={completed}> </i>) : (<i className="fas fa-bed" style={styleThis(this.props.currentStep,'hotels')}></i>)}
                       {this.props.eventStatus ? (<i className="fas fa-ticket-alt" style={completed}></i>) : (<i className="fas fa-ticket-alt" style={styleThis(this.props.currentStep,'events')}></i>)}
                       {this.props.attractionStatus ? (<i className="fas fa-dungeon" style={completed}></i>) : (<i className="fas fa-dungeon" style={styleThis(this.props.currentStep,'attractions')}></i>)}
                    </ul>
                  </div>
        </aside>

    );
  }
}


export default Overview;

// {this.props.currentStep = 'start' ? (<i className="fas fa-user-friends" style={ongoing}></i>) :( this.props.startStep ? (<i className="fas fa-user-friends" style={completed}></i>) : (<i className="fas fa-user-friends"></i>) )}