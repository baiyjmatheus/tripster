import React, {Component} from 'react';
import io from 'socket.io-client';

import { HashRouter, Route, Link } from 'react-router-dom';

import Login from './login/Login.jsx';
import Planner from './planner/Planner.jsx';

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
          <Route exact path='/' component={ Login } />
          <Route path='/planner' component={ Planner }/>
        </div>
      </HashRouter>
      
    );
  }
}
export default App;
