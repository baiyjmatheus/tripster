import React, { Component } from 'react';
import io from 'socket.io-client';
import Overview from './Overview.jsx';
import Whiteboard from './Whiteboard.jsx';
import Chat from './Chat.jsx';

class Planner extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    console.log("componentWillMount <App />");
    // connect new websocket
    const socket = io('http://localhost:8080');
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
        <Chat socket={ this.state.socket } />
      </div>
    );
  }
}

export default Planner;