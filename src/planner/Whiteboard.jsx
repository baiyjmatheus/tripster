import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Ready from './whiteboard-components/Ready.jsx';
import Start from './whiteboard-components/Start.jsx';
import Flight from './whiteboard-components/Flight.jsx';
import Hotel from './whiteboard-components/Hotel.jsx';
import Event from './whiteboard-components/Event.jsx';
import Attraction from './whiteboard-components/Attraction.jsx';

class Whiteboard extends Component {
  constructor() {
    super();

    this.state = {
      readyBtnStatus: 'Ready',
      readyBtnColor: 'rgb(60, 186, 84)',
      currentStep: 'start',
      start: false,
      flights: false,
      hotels: false,
      events: false,
      attractions: false
    }
  }

  // Switches the step state when ready button is clicked
  changeStepState = (key) => {
    this.setState({[key]: !this.state[key]});
    this.props.socket.emit(`${this.state.currentStep}`, this.state[key]);
  }

  // Reset the button to Ready when redirected and changes the currentStep state
  componentWillMount() {
    this.props.socket.on('next', (step) => {
      this.changeReadyBtn('rgb(60, 186, 84)', 'Ready');
      this.setState({currentStep: step});
    });
  }

  render() {
    const url = this.props.tripURL;
    return (

      <Router>
        <main id="whiteboard" className="full-height">
          <div id="trip-header">
            <div id="trip-info">
              <h1>Amazing trip</h1>
              <h4>Location: Paris</h4>
            </div>
            <div id="ready-btn">
              <Ready status={this.state.readyBtnStatus} currentStep={this.state.currentStep} changeStepState={this.changeStepState} changeReadyBtn={this.changeReadyBtn} color={this.state.readyBtnColor}/>
            </div>
          </div>
          <div id="suggestion-container">
            <Switch>
              <Route exact path={`${url}`} render={() => (<Start tripURL={this.props.tripURL} currentStep={this.state.currentStep} />)} />
              <Route path={`${url}/flights`} render={() => <Flight tripId={this.props.tripId} socket={this.props.socket} tripURL={this.props.tripURL} currentStep={this.state.currentStep} />}/>
              <Route path={`${url}/hotels`}  render={() => <Hotel socket={this.props.socket} tripId={this.props.tripId} tripURL={this.props.tripURL} currentStep={this.state.currentStep} />}/>
              <Route exact path={`${url}/events`} render={() => <Event url={url} tripId = {this.props.tripId} socket={this.props.socket} tripURL={this.props.tripURL} currentStep={this.state.currentStep} />}/>
              <Route path={`${url}/attractions`}  render={() => <Attraction url={`${url}/attractions`} socket={this.props.socket} tripId={this.props.tripId} currentStep={this.state.currentStep} tripURL={this.props.tripURL} />} />
            </Switch>
          </div>
        </main>
      </Router>

    );
  }

  // Changes ready button color and text
  changeReadyBtn = (color, btnText) => {
    this.setState({readyBtnColor: color, readyBtnStatus: btnText});
  }
}

export default Whiteboard;