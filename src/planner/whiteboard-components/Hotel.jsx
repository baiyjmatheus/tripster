import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Card from './Card.jsx';
import { Redirect } from 'react-router-dom';
import hotelDataArray from './hotelData.json'

class Hotel  extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      hotels: hotelDataArray,
    }
  }

  componentWillMount() {
    this.props.socket.emit('hotels request')
    this.props.socket.on('hotel data', hotelsData => {
      console.log(hotelsData)
      this.setState({hotels: hotelsData})
    })

    this.props.socket.on('hotel selection', hotel => {
      this.props.getSelectedItems(this.state.hotels, 'hotels')
      let stateCopy = Object.assign({}, this.state);
      stateCopy.hotels[this.findHotelIndexById(this.state.hotels, hotel.id)] = hotel
      this.setState({stateCopy})
    })
  }

  render () {
    const loadingStyle = {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '50px'
    };

    if (this.props.currentStep !== 'hotels') {
      return (
        <Redirect to={`${this.props.tripURL}/${this.props.currentStep}`} />
      );
    } else {
      const hotelArray = this.state.hotels

      if (hotelArray.length !== 0) {
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
            <div id="flights-container">
              {hotelItem}
            </div>
          </div>
        )
      } else {
        return (
          <div style={loadingStyle}>
            <ReactLoading type={'spin'} color={'#5078F2'} height={64} width={64}/>
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

