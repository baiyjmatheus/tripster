import React, { Component } from 'react';
import Card from './Card.jsx';
import axios from 'axios';

class Flight  extends Component {
  constructor() {
    super();

    this.state = {
      flights: []
    };
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/trips/${this.props.tripId}/flights`)
      .then((res) => {
        this.setState({flights: res.data.data});
      });
  }

  render () {
    const flightCards = this.state.flights.map((flight) => {
          return  <Card title={`${flight.route.length - 1} stops`} rating={((flight.quality / 100) / 2).toPrecision(2)} address={`From: ${flight.flyFrom} \t To: ${flight.flyTo}`} price={flight.price} imgSrc={'https://images.pexels.com/photos/674783/pexels-photo-674783.jpeg?cs=srgb&dl=aerial-air-air-traffic-674783.jpg&fm=jpg'}/>
    });
    return (
      <div id="flights-container">
        { flightCards }
      </div>
    )
  }
}

export default Flight;