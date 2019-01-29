import React, { Component } from 'react';

class Start extends Component {
  render(){
    const buttonStyle = {
      width: '300px',
      padding: '16px 0',
      borderRadius: '32px',
      background: 'green',
      border: 0
    }
    return (
      <div id="start-plan-container">
        <button onClick={this.ready} style={buttonStyle}>Start</button>
      </div>
    )
  }

  ready = (evt) => {
    const socket = this.props.socket;
    let btnBackground = evt.target.style.background
    socket.emit('startReady', true);
    if (btnBackground === 'green') {
      evt.target.style.background = 'tomato';
      btnBackground = 'tomato';
    } else {
      evt.target.style.background = 'green';
      btnBackground = 'green';
    }
  }
}

export default Start;