import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    return (
      <section id="message-list">
        <p><strong style={{"color": "tomato"}}>Mike</strong>: JUSTIFY THE CONTENT</p>
        <p><strong style={{"color": "greenyellow"}}>Matt</strong>: BURRITO GENIUS</p>
        <p><strong style={{"color": "yellow"}}>Mariam</strong>: WHAT? I DONT KNOW!</p>
      </section>
    );
  }
}

export default MessageList;