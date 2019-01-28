import React, { Component } from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import ChatHeader from './ChatHeader.jsx';

class Chat extends Component {
	 constructor() {
    super()
    this.state = {
      currentUser: {
        id: 1,
        name: 'test_name',
        color: 'blue'
      },
      messages: []
    }
  }
  
  componentDidMount() {
    this.props.socket.on('new message', msg => {
      this.setState({ messages: [...this.state.messages, msg] }, () => {
        console.log('from sendNewMessage', this.state.messages)
      })
    })
  }


  render() {
    return (
      <aside id="chat">
        <ChatHeader />
        <MessageList messages = { this.state.messages } />
        <ChatBar sendNewMessage = { this.sendNewMessage } currentUser = { this.state.currentUser }/>
      </aside>
    );
  }

  sendNewMessage = msg => {
    this.props.socket.emit('new message', msg) 
  }
}

export default Chat;