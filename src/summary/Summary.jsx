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

    const returnBestOption = (array)=> {
      const sortedArray = array.sort(function (a, b) {
        return a.price - b.price;
      });

      return sortedArray[0]
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

          const flightsList = this.state.data.flights.map(flight => {
              const routeList = flight.route.map(layover => {
                return(<li>{layover.cityFrom} - {layover.cityTo} </li>)
              })
              return  (<ul> <li>flight id# {flight.id}: {(flight.route.length - 1)} stops - ${flight.price} </li>
                {routeList}
                </ul>)

          })

          const hotelsList = this.state.data.hotels.map(hotel => {
                return  (<li> {hotel.name} - ${hotel.price}/night </li>)
           })

          const bestFlightOption = returnBestOption(this.state.data.flights)
          const bestHotelOption = returnBestOption(this.state.data.hotels)

      return (
      <div id='summary-container'>
        <section id='summary-details'>

          <div id='title'>
           <h1> Trip Summary </h1>
          </div>

          <div id='trip-details'>
             <h3> Trip Name :  {this.state.data.trip[0].name} </h3>
             <h4> {formattedDate(this.state.data.trip[0].start_date)} to {formattedDate(this.state.data.trip[0].end_date)} </h4>
             <h4> Origin: {this.state.data.trip[0].origin}</h4>
             <h4> Destination: {this.state.data.trip[0].destination}</h4>
           </div>

           <div  className='step-details'>
             <h3> Flight options </h3>
             <ul> {flightsList} </ul>
             <li> Our reccommended flight: {bestFlightOption.id} - ${bestFlightOption.price} </li>
          </div>

          <div className='step-details'>
               <h3> Hotel options </h3>
             <ul> {hotelsList} </ul>
              <li> Our reccommended hotel: {bestHotelOption.name} - ${bestHotelOption.price}/night </li>
          </div>

          <div className='step-details'>
            <h3> Chosen Events:  </h3>
              <ul> {eventsList}</ul>
          </div>

          <div className='step-details'>
          <h3> Chosen Attractions: </h3>
           <ul> {attractionsList}</ul>
           </div>

        </section>


          <MapContainer trip={this.state.data} />
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


