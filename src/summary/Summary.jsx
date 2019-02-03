import React, { Component, PropTypes } from 'react';
import MapContainer from './MapContainer.jsx'
import axios from 'axios';
// import cities from 'all-the-cities';
// import cities from 'all-the-cities';
// import fs from 'fs';

class Summary extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/trips/${this.props.match.params.trip_id}/summary`)
      .then(res => {
        const data = res.data;
        this.setState({ data })
      })
	}

  render() {
    if (this.state.data) {    
      return (
        <MapContainer trip={this.state.data}/>
      );
    } else {
      return (
        <p style={{color: 'darkgreen', textAlign: 'center'}}> Loading... </p>
        )
    }
  }

  // getCityCoordinates = city => {
  //   cities.filter(cityName => {
  //     return cityName.name.match(city)
  //   })
  // }
}

export default Summary;
