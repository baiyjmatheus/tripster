import React, { Component, PropTypes } from 'react';
import MapContainer from './MapContainer.jsx'
import axios from 'axios';
import ReactLoading from 'react-loading';
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

    const formattedDate = (date) => {
      const year = date.slice(0,4)
      const month= date.slice(5,7)
      const day= date.slice(8,10)

      return `${day}-${month}-${year}`
    }

    console.log("this is the date from query: ", this.state.data)

    if (this.state.data) {

          const attractionsList = this.state.data.attractions.map(attraction => {
            console.log('attraction from map:', attraction.name)
               return  (<li> {attraction.name} </li>)
           })

          const eventsList = this.state.data.events.map(event => {
            console.log('attraction from map:', event.name)
               return  (<li> {event.name} </li>)
           })
      return (
      <div id='summary-container'>
        <section id='summary-details'>

          <h1> trip summary </h1>
          <div> <h3> Trip Name : {this.state.data.trip[0].name} </h3> </div>
          <h4> From {formattedDate(this.state.data.trip[0].start_date)} until {formattedDate(this.state.data.trip[0].end_date)} </h4>
          <h4> Origin: {this.state.data.trip[0].origin}</h4>
          <h4> Destination: {this.state.data.trip[0].destination}</h4>

          <div> <h3> Flight details </h3></div>
          <div> <h3> Chosen Events:  </h3>
             <ul> {eventsList}</ul>
          </div>
          <div> <h3> Chosen Attractions: </h3>
          <ul> {attractionsList}</ul>
          </div>

        </section>
        <MapContainer trip={this.state.data}/>
       </div>
        );
    } else {
      return (
        <ReactLoading type={'spin'} color={'#5078F2'} height={64} width={64}/>
      );
    }
  }

  // getCityCoordinates = city => {
  //   cities.filter(cityName => {
  //     return cityName.name.match(city)
  //   })
  // }
}

export default Summary;
