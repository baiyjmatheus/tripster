import React, { Component } from 'react';
import Card from './Card.jsx';
import { Redirect } from 'react-router-dom';

class Hotel  extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      hotels: null,
    }
  }

  componentWillMount() {
    this.props.socket.emit('hotels request')
    this.props.socket.on('hotel data', hotelsData => {
      console.log(hotelsData)
      this.setState({hotels: hotelsData})
    })
  }

  render () {
    if (this.props.currentStep !== 'hotels') {
      return (
        <Redirect to={`${this.props.tripURL}/${this.props.currentStep}`} />
      );
    } else {
      const hotelArray = this.state.hotels

      if (hotelArray) {
        const hotelItem = hotelArray.map( hotel => {
        return <Card key={Math.random()} title={hotel.name} rating={hotel.rating} address={hotel.address} imgSrc={hotel.img} location={hotel.location} price={hotel.price}/>
      })
        return (
          <div>
            <h1> this is the hotels page </h1>
            <div id="flights-container">
              {hotelItem}
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <h1> Selecting the best Hotels for you! </h1>
          </div>
        );
      }
    }
  }
}

export default Hotel

