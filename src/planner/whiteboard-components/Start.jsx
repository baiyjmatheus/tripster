import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Start extends Component {
  render() {
    if (this.props.currentStep !== 'start') {
      return (
        <Redirect to={`${this.props.tripURL}/${this.props.currentStep}`} />
      );
    } else {
      return (
        <div id="start">
          <h2>Click ready and wait for all participants</h2>
        </div>
      );
    }
  }
}

export default Start;