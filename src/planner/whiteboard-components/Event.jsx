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

  componentDidMount() {
    this.props.socket.emit('events request', this.props.tripId)

    this.props.socket.on('events data', eventsData => {
      console.log(eventsData[0].lat, eventsData[0].long)
      this.setState({events: eventsData})
    })
    // recieves broadcast of new event selection and replaces that event obj
    this.props.socket.on('event selection', event => {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.events[this.findEventIndexById(this.state.events, event.id)] = event
      this.setState({stateCopy})
    })


  }

  render () {

    if (this.state.events) {
        const events = this.state.events.map(event => {
          return <Card 
            id={ event.id }
            socketIds={ event.socketIds }
            addUserSelection={ this.addUserSelection }
            title={ event.name }
            rating={ event.rating } 
            address={ event.address } 
            imgSrc={ event.img }
            price={ event.price }
          />
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
  // when a user clicks a card, their corresponding socketId obj on that card is updated with sel' status & color
  addUserSelection = (cardId) => {
    let event;
    this.state.events.forEach((e) => {
      if (e.id == cardId) {
        event = e
      }
    })
    event.socketIds[this.props.currentUser.socketId].selected = !event.socketIds[this.props.currentUser.socketId].selected
    event.socketIds[this.props.currentUser.socketId].color = this.props.currentUser.color;
    this.props.socket.emit('event selection', event)
  }
  // takes in events array and ouputs index of event at given id
  findEventIndexById = (events, id) => {
    let index;
    events.forEach((e, i) => {
      if (e.id === id) {
        index = i
      }
    })
    return index;
  }
}

export default Event;