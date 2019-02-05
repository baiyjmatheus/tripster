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
        <div id="start" style={{color: '#5078f2'}}>
          <h2>Invite your friends!</h2>
          <div style={{display: 'flex', justifyContent: 'space-between', width: '280px', margin: '0 auto'}}>
            <span> Trip code:&nbsp;</span>
            <input readOnly value={`${this.props.tripId}`} style={{border: 'none', color: '#5078f2'}} id="copy" />
            <button onClick={this.copyToClipboard}><i style={{color: '#5078f2'}} className="fas fa-copy"></i></button>
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