import React, {Component} from 'react';
import io from 'socket.io-client';
import Overview from './Overview.jsx';
import Whiteboard from './Whiteboard.jsx';
import Chat from './Chat.jsx';

class App extends Component {

  componentDidMount() {
    console.log("componentDidMount <App />");
    // connect new websocket on app mount
    this.socket = io('http://localhost:8080');
    // check for connection --temp err handling
    if (this.socket) {
      console.log('Socket successfully established');
    } else {
      console.log('Socket failed to connect')
    }
  }

  render() {
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
