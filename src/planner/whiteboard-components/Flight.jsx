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
        console.log(res.data.data);
      });
  }

  render () {
    console.log(this.state.flights);
    const flightCards = this.state.flights.map((flight) => {
          return  <Card title={`${flight.route.length - 1} stops`} rating={((flight.quality / 100) / 2).toPrecision(2)} address={`From: ${flight.flyFrom} \t To: ${flight.flyTo}`} price={flight.price}/>
    });
    return (
      <div id="flights-container">
        { flightCards }
      </div>
    )
  }
}

export default Flight;