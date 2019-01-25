import React, { Component } from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import ChatHeader from './ChatHeader.jsx';

class Chat extends Component {
  render() {
    return (
      <aside id="chat">
        <ChatHeader />
        <MessageList />
        <Chatbar />
      </aside>
    );
  }
}

export default Chat;