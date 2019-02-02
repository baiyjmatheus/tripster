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
      readyBtnColor: 'rgb(60, 186, 84)', // green
      currentStep: 'start',
      start: false,
      flights: false,
      hotels: false,
      events: false
    }
  }

  getSelectedItems = (items, type) => {
    let selectedItems = [];
    items.forEach(item => {
      for (let user in item.socketIds) {
        if (item.socketIds[user].selected) {
          selectedItems.push(item);
          break;
        }
      }
    });
    this.setState({[type + 'Selections']: selectedItems})
  }

  changeStepState = (key) => {
    this.setState({[key]: !this.state[key]});
    this.props.socket.emit(`${this.state.currentStep}`, this.state[key]);
  }

  componentWillMount() {
    this.props.socket.on('next', (step) => {
      // send data to server for db here
      this.props.socket.emit(`${step[0]} final selections`, { tripId: this.props.tripId, data: this.state[`${step[0]}Selections`] })
      this.setState({currentStep: step[1]});
      this.changeReadyBtn('rgb(60, 186, 84)', 'Ready');
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
              <Route 
                exact path={`${url}`} 
                render={() => <Start
                  tripURL={this.props.tripURL} 
                  currentStep={this.state.currentStep} 
                />} 
              />
              <Route 
                path={`${url}/flights`} 
                render={() => <Flight 
                  tripId={this.props.tripId} 
                  socket={this.props.socket} 
                  tripURL={this.props.tripURL} 
                  currentStep={this.state.currentStep}
                  getSelectedItems={this.getSelectedItems}
                  currentUser={this.props.currentUser}
                />}
              />
              <Route 
                path={`${url}/hotels`}  
                render={() => <Hotel 
                  socket={this.props.socket} 
                  tripId={this.props.tripId} 
                  tripURL={this.props.tripURL} 
                  currentStep={this.state.currentStep}
                  getSelectedItems={this.getSelectedItems}
                  currentUser={this.props.currentUser}
                />}
              />
              <Route 
                exact path={`${url}/events`} 
                render={() => <Event 
                  url={url} 
                  tripId={this.props.tripId} 
                  tripURL={this.props.tripURL}
                  socket={this.props.socket} 
                  currentUser={this.props.currentUser}
                  getSelectedItems={this.getSelectedItems}
                />}
              />
              <Route 
                path={`${url}/attraction`}  
                component={Attraction}
              />
            </Switch>
          </div>
        </main>
      </Router>

    );
  }

  changeReadyBtn = (color, btnText) => {
    this.setState({readyBtnColor: color, readyBtnStatus: btnText});
  }
}

export default Whiteboard;