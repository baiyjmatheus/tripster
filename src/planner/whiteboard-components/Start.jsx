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
      background: 'green',
      border: 0
    }
    if (this.state.redirect) {
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
      console.log('here');
      this.setState({redirect: true}); 
    });
  }

  ready = (evt) => {
    const socket = this.props.socket;
    let btnBackground = evt.target.style.background
    socket.emit('startReady', true);
    if (btnBackground === 'green') {
      evt.target.style.background = 'tomato';
      btnBackground = 'tomato';
      evt.target.innerText = 'Waiting for all participants...';
    } else {
      evt.target.style.background = 'green';
      btnBackground = 'green';
      evt.target.innerText = 'Start';
    }
  }
}

export default Start;