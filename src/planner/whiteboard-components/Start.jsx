import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Start extends Component {
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

     // renders events from start -- switch  '/events' to your own page for testing
      // return (<Redirect to={`${this.props.url}/events`} />);
      return (<Redirect to={`${this.props.url}/events`} />);
    } else {
    if (this.props.currentStep !== 'start') {
      return (
        <Redirect to={`${this.props.tripURL}/${this.props.currentStep}`} />
      );
    } else {
      return (<h2>Click ready and wait for all participants</h2>);
      }
    }
  }
}

export default Start;