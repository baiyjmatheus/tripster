import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Start extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    }
  }

  render() {
    const buttonStyle = {
      width: '300px',
      padding: '16px 0',
      borderRadius: '32px',
      background: 'rgb(60, 186, 84)',
      border: 0
    }
    if (this.state.redirect) {
      // Render loading animation before redirect (timeout)
      return (<Redirect to={`${this.props.url}/flights`} />);
    } else {
      return (
        <div id="start-plan-container">
          <button onClick={this.ready} style={buttonStyle}>Start</button>
        </div>
      )
    }
  }

  componentDidMount() {
    this.props.socket.on('next step', (step) => {
      this.setState({redirect: true});
    });
  }

  ready = (evt) => {
    const socket = this.props.socket;
    let btnBackground = evt.target.style.background;
    socket.emit('startReady', true);
    if (btnBackground === 'rgb(60, 186, 84)') {
      evt.target.style.background = 'rgb(244, 194, 13)';
      btnBackground = 'rgb(244, 194, 13)';
      evt.target.innerText = 'Waiting for all participants...';
    } else {
      evt.target.style.background = 'rgb(60, 186, 84)';
      btnBackground = 'rgb(60, 186, 84)';
      evt.target.innerText = 'Start';
    }
  }
}

export default Start;