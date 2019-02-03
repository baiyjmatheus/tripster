import React, { Component } from 'react';
import Card from './Card.jsx';
import { Redirect } from 'react-router-dom';
import hotelDataArray from './hotelData.json';

class Hotel  extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      hotels: []
    }
  }

  componentWillMount() {

    if(!this.state.hotels.length){
      this.props.socket.emit('hotels request')
      this.props.socket.on('hotel data', hotelsData => {
      console.log(hotelsData)
      this.setState({hotels: hotelsData})
      })
    }


    this.props.socket.on('hotel selection', hotel => {
      this.props.getSelectedItems(this.state.hotels, 'hotels')
      let stateCopy = Object.assign({}, this.state);
      stateCopy.hotels[this.findHotelIndexById(this.state.hotels, hotel.id)] = hotel
      this.setState({stateCopy})
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
          return <Card
            key={Math.random()}
            id={hotel.id}
            title={hotel.name}
            rating={hotel.rating}
            address={hotel.address}
            imgSrc={hotel.img}
            location={hotel.location}
            price={hotel.price}
            addUserSelection={this.addUserSelection}
            socketIds={hotel.socketIds}
          />
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

  addUserSelection = (hotelId) => {
    let hotel;
    this.state.hotels.forEach((e) => {
      if (e.id == hotelId) {
        hotel = e
      }
    })
    hotel.socketIds[this.props.currentUser.socketId].selected = !hotel.socketIds[this.props.currentUser.socketId].selected
    hotel.socketIds[this.props.currentUser.socketId].color = this.props.currentUser.color;

    this.props.socket.emit('hotel selection', hotel);
  }

  findHotelIndexById = (hotels, id) => {
    let index;
    hotels.forEach((e, i) => {
      if (e.id === id) {
        index = i
      }
    })
    return index;
  }
}

export default Hotel

