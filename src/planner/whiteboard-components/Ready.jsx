import React, { Component } from 'react';

class Ready extends Component {
  render() {
    const buttonStyle = {
      width: '300px',
      padding: '16px 0',
      borderRadius: '32px',
      background: 'rgb(60, 186, 84)',
      border: 0
    }
    return (
      <button onClick={this.handleClick} style={buttonStyle}>Start</button>
    );
  }

  handleClick = (evt) => {
    this.props.changeStepState(this.props.currentStep); // this.props.currentStep
    let btnBackground = evt.target.style.background;
    if (btnBackground === 'rgb(60, 186, 84)') {
      this.changeButton(evt.target, 'rgb(244, 194, 13)', 'Waiting for all participants...');
    } else {
      this.changeButton(evt.target, 'rgb(60, 186, 84)', 'Ready');
    }
  }

  changeButton = (btn,color, text) => {
    btn.style.background = color;
    btn.innerText = text;
  }
}

export default Ready;