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
    socket.emit('new user', userId)

    socket.on('new user', user => {
      this.setState({ currentUser: user }, () => {
        console.log(this.state.currentUser)
      })
    })
    // check for connection --temp err handling
    if (socket) {
      this.setState({ socket: socket }, () => {
        console.log("Socket set to state", this.state.socket)
      })
    } else {
      console.log('Socket failed to connect')
    }
  }

  render() {
    console.log("from planner", this.state)
    return (
      <div id="app" className="full-height">
        <Overview />
        <Whiteboard />
        <Chat socket={ this.state.socket } currentUser = { this.state.currentUser } />
      </div>
    );
  }
}

export default Planner;