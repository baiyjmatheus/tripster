import React, { Component } from 'react';

class Ready extends Component {
  render() {
    const buttonStyle = {
      width: '300px',
      padding: '16px 0',
      borderRadius: '32px',
      background: this.props.color,
      border: 0
    }
    return (
      <button onClick={this.handleClick} style={buttonStyle}>{this.props.status}</button>
    );
  }

  handleClick = (evt) => {
    this.props.changeStepState(this.props.currentStep);
    let btnBackground = evt.target.style.background;
    if (btnBackground === 'rgb(60, 186, 84)') {
      this.props.changeReadyBtn('rgb(244, 194, 13)', 'Waiting for all participants...');
    } else {
      this.props.changeReadyBtn('rgb(60, 186, 84)', 'Ready');
    }
  }
}

export default Ready;