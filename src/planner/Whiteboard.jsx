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
      currentStep: 'start',
      start: false,
      flights: false,
      hotels: false,
      events: false
    }
  }

  changeStepState = (key) => {
    this.setState({[key]: !this.state[key]});
    this.props.socket.emit(`${this.state.currentStep}`, this.state[key]);
  }

  componentWillMount() {
    this.props.socket.on('next', (step) => {
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
              <Ready currentStep={this.state.currentStep} changeStepState={this.changeStepState}/>
            </div>
          </div>
          <div id="suggestion-container">
            <Switch>
              <Route exact path={`${url}`} render={() => (<Start tripURL={this.props.tripURL} currentStep={this.state.currentStep} />)} />
              <Route path={`${url}/flights`} render={() => <Flight tripId={this.props.tripId} socket={this.props.socket} tripURL={this.props.tripURL} currentStep={this.state.currentStep} />}/>
              <Route path={`${url}/hotels`}  render={() => <Hotel socket={this.props.socket} tripId={this.props.tripId} tripURL={this.props.tripURL} currentStep={this.state.currentStep} />}/>
              <Route exact path={`${url}/events`} render={() => <Event url={url} tripId = {this.props.tripId} socket={this.props.socket} />}/>
              <Route path={`${url}/attraction`}  render={() => <Attraction url={`${url}/attraction`} socket={this.props.socket} tripId={this.props.tripId}/>}/>
            </Switch>
          </div>
        </main>
      </Router>

    );
  }
}

export default Whiteboard;