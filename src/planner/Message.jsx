import React, { Component } from 'react';

class Message extends Component {
  render() {
  	console.log('from message', this.props)
    return (
      <div>
        <p>
          <strong style={{"color": this.props.color}}>{this.props.name}</strong>
          : { this.props.content }</p>
      </div>
    );
  }
}

export default Message;