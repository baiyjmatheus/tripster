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
      console.log(eventsData[0].socketIds)
      this.setState({events: eventsData})
    })

    this.props.socket.on('event selection', userSelection => {
      console.log(userSelection)
      let stateCopy = Object.assign({}, this.state);
      stateCopy.events[userSelection.index].selectionsBySockets[this.props.currentUser.socketId] = !stateCopy.events[userSelection.index].selectionsBySockets[this.props.currentUser.socketId]
      console.log('from event sel', stateCopy.events[userSelection.index].selectionsBySockets[this.props.currentUser.socketId])
      this.setState(stateCopy)
    })
  }

  render () {
    if (this.state.events) {
        const events = this.state.events.map(event => {
          return <Card 
            selectionsBySockets={event.selectionsBySockets}
            currentUser={this.props.currentUser}
            handleSelection={ this.handleSelection }
            id={ event.id }
            title={ event.name }
            rating={ event.rating } 
            address={ event.address } 
            imgSrc={ event.img }
            price={ event.price }
            selected={ event.selected }
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

  handleSelection = (cardId) => {
    let index;
    let stateCopy = Object.assign({}, this.state);
    this.state.events.forEach((e, i) => {
      if (e.id === cardId) {
        index = i
      }
    })
    stateCopy.events[index].selected = !stateCopy.events[index].selected
    let userSelection = {
      index,
      currentUser: this.props.currentUser
    }
    this.props.socket.emit('event selection', userSelection)
  }
}



export default Event;