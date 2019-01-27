import React, { Component } from 'react';

class ChatBar extends Component {

  handleNewMessage = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      const msg = {
        name: this.props.currentUser.name,
        color: this.props.currentUser.color,
        content: e.target.value
      }
      this.props.sendNewMessage(msg)
      e.target.value = ''
    }
  }

  render() {
    console.log('from chatbar', this.props)
    return (
      <footer id="chatbar">
        <textarea onKeyPress={ this.handleNewMessage } cols="20" rows="2"></textarea>
        <button onClick= { this.handleNewMessage } ><i className="fab fa-telegram-plane"></i></button>
      </footer>
    );
  }
}

export default ChatBar;