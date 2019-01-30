import React, { Component } from 'react';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import Overview from './Overview.jsx';
import Whiteboard from './Whiteboard.jsx';
import Chat from './Chat.jsx';

class Planner extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log("componentWillMount <App />");
    const cookies = new Cookies()
    const userId = cookies.get('user_id')
    // connect new websocket
    const socket = io('http://localhost:8080');
    // send userId from cookie to server
    socket.emit('new user', userId)
    // recieves currentUser obj from server and concats to state
    socket.on('new user', user => {
      this.setState({ currentUser: user }, () => {
        console.log(this.state.currentUser)
      })
    })
    // check for connection --temp err handling
    if (socket) {
      // concat socket to state
      this.setState({ socket: socket }, () => {
        console.log("Socket set to state", this.state.socket)
      })
    } else {
      console.log('Socket failed to connect')
    }
  }

  render() {
    return (
      <div id="app" className="full-height">
        <Overview />
        <Whiteboard tripURL = {this.props.match.url}  tripId= {this.props.match.params.trip_id} socket={ this.state.socket }/>
        <Chat socket={ this.state.socket } currentUser = { this.state.currentUser } />
      </div>
    );
  }
}

export default Planner;