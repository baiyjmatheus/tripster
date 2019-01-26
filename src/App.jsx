import React, {Component} from 'react';
import io from 'socket.io-client';
import Overview from './Overview.jsx';
import Whiteboard from './Whiteboard.jsx';
import Chat from './Chat.jsx';

import { HashRouter, Route, Link } from 'react-router-dom';
import Login from './login/Login.jsx';

class App extends Component {

  componentDidMount() {
    console.log("componentDidMount <App />");
    // connect new websocket on app mount
    this.socket = io('http://localhost:8080');
    // check for connection --temp err handling
    if (this.socket) {
      console.log('Socket successfully established', this.socket);
    } else {
      console.log('Socket failed to connect')
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/' render={() => (
            <div id="app" className="full-height">
              <Overview />
              <Whiteboard />
              <Chat />
            </div>
          )}/>
          <Route path='/login' component={ Login }/>
          <Route path='/location' render={ () => (
            <div>
              <h2 style={{color: 'black'}}>Enter Location</h2>
              <Link to='/date'>Enter Date</Link>
            </div>
          )}/>
          <Route path='/date' render={ () => (<h2 style={{color: 'black'}}>Enter Date</h2>) } />
        </div>
      </HashRouter>
      
    );
  }
}
export default App;
