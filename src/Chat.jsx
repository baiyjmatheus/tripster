import React, { Component } from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import ChatHeader from './ChatHeader.jsx';

class Chat extends Component {
  render() {
    return (
      <aside id="chat">
        <ChatHeader />
        <MessageList />
        <ChatBar />
      </aside>
    );
  }
}

export default Chat;