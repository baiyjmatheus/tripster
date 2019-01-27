import React, { Component } from 'react';

class ChatBar extends Component {

  handleNewMessage = (e) => {
    if (e.key == 'Enter') {
      this.props.sendNewMessage(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    console.log('from chatbar', this.props)
    return (
      <footer id="chatbar">
        <textarea onKeyPress={ this.handleNewMessage } cols="20" rows="2"></textarea>
        <button><i className="fab fa-telegram-plane"></i></button>
      </footer>
    );
  }
}

export default ChatBar;