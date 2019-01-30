import React, { Component } from 'react';
import Card from './Card.jsx';
import axios from 'axios';

class Event extends Component {
  constructor() {
    super();
    this.state = {
      events: null
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/trips/${parseInt(this.props.tripId)}/events`)
    .then(res => {
      const eventData = res.data.events.map(event => {
        const img = event.logo ? event.logo.url : 'http://www.eventelephant.com/wp-content/uploads/2019/01/What-Makes-Xsaga-Different.jpg'
        const rating = Math.floor((Math.random() * 5) * 10) / 10
        const price = Math.floor((Math.random() * 250) * 100) / 100 
        return { 
          name: event.name.text, 
          description: event.description.text, 
          start_time: event.start.local, 
          end_time: event.end.local,
          img: img,
          address: event.venue.address.address1,
          rating: rating,
          price: price
        }
      })
      this.setState({ events: eventData })
    })
  }

  render () {
    if (this.state.events) {
        const events = this.state.events.map(event => {
          return <Card 
            title={ event.name }
            rating={ event.rating } 
            address={ event.address } 
            imgSrc={ event.img }
            price={ event.price }/>
        })
      return (
        <div id="events-container">
          { events }
        </div>
      )
    } else {
      return (
        <div>
          <p>
          Loading...
          </p>
        </div>
      )
    }
  }
}

export default Event;