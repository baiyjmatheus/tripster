import React, {Component} from 'react';
import io from 'socket.io-client';

import { HashRouter, Route, Link } from 'react-router-dom';

import Login from './login/Login.jsx';
import Planner from './planner/Planner.jsx';
import Selection from './selection/Selection.jsx';

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // connect new websocket on app mount
    this.socket = io('http://localhost:8080');
    // check for connection --temp err handling
    if (this.socket) {
      this.setState({socket: this.socket}, () => {
        console.log("from app", this.state.socket)
      })
    } else {
      console.log('Socket failed to connect')
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/' component={ Login } />
          <Route path='/trips/:trip_id' component={ Planner }/>
          <Route path='/trips' component={ Selection }/>
        </div>
      </HashRouter>
      
    );
  }
}
export default App;
