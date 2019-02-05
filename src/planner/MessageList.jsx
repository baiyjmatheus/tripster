import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <section id="message-list"> 
        {              	
          this.props.messages.map(msg => <Message color={ msg.color } name= { msg.name } content={msg.content}/> )
        }
      </section>
    );
  }
}

export default MessageList;