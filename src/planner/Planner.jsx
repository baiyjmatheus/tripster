import React, { Component } from 'react';
import Overview from './Overview.jsx';
import Whiteboard from './Whiteboard.jsx';
import Chat from './Chat.jsx';

class Planner extends Component {
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

export default Planner;