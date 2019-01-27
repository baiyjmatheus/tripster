import React, { Component } from 'react';
import Overview from './Overview.jsx';
import Whiteboard from './Whiteboard.jsx';
import Chat from './Chat.jsx';

class Planner extends Component {
  render() {
    console.log("from planner", this.props)
    return (
      <div id="app" className="full-height">
        <Overview />
        <Whiteboard />
        <Chat socket={ this.props.socket } />
      </div>
    );
  }
}

export default Planner;