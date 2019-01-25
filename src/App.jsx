import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import Overview from './Overview.jsx';
import Whiteboard from './Whiteboard.jsx';
import Chat from './Chat.jsx';

class App extends Component {
  constructor() {
    super()
    this.state = {
      endpoint: 'http://localhost:8080'
    }
  }

	send = () => {
    const socket = socketIOClient(this.state.endpoint);

    socket.emit('test', 'am i working?');
  }

  render() {

    const socket = socketIOClient(this.state.endpoint);

    socket.on('test', msg => {
      console.log('recieved msg: ', msg)
    });

    return (
      <div id="app" className="full-height">
        <Overview />
        <Whiteboard />
        <Chat />
      </div>
    );
  }
}
export default App;
