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
          <h2>Invite your friends!</h2>

          <div style={{margin: '0 auto'}}>
            <p style={{fontWeight: 'bold'}}>Trip code:</p> 

            <input readOnly value={`${this.props.tripId}`} style={{border: 'none', width: '320px', fontSize: '16px'}} id="copy" />
            <button style={{fontSize: '16px'}} onClick={this.copyToClipboard}><i className="fas fa-copy"></i></button>
          </div>

          <h2>Click ready and wait for all participants</h2>
        </div>
      );
    }
  }

  copyToClipboard = (e) => {
    let link = document.getElementById('copy')
    link.select()
    document.execCommand('copy')
  }
}

export default Start;