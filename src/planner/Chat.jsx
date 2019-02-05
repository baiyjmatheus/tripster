import React, { Component } from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import ChatHeader from './ChatHeader.jsx';

class Chat extends Component {
	 constructor() {
    super()
    this.state = {
      messages: [],
      users: []
    }
  }
  
  componentDidMount() {
    this.props.socket.on('new message', msg => {
      this.setState({ messages: [...this.state.messages, msg] }, () => {
        console.log('from sendNewMessage', this.state.messages)
      })
    });

    this.props.socket.on('connected notification', notification => {
      this.setState({messages: [...this.state.messages, notification]});
    });

    this.props.socket.on('disconnected notification', notification => {
      this.setState({messages: [...this.state.messages, notification]});
    });

    this.props.socket.on('connected user', users => {
      const usersColors = [];
      const colors = ['rgb(60, 186, 84)', 'rgb(244, 194, 13)', '#dd4b39'];
      users.forEach(user => {
        usersColors.push(colors[usersColors.length % colors.length]);
      });
      this.setState({users: usersColors});
    });

    this.props.socket.on('disconnected user', users => {
      this.setState({users: users});
    });
  }


  render() {
    return (
      <aside id="chat">
        <ChatHeader users={this.state.users} />
        <MessageList messages = { this.state.messages } />
        <ChatBar sendNewMessage = { this.sendNewMessage } currentUser = { this.props.currentUser }/>
      </aside>
    );
  }

  sendNewMessage = msg => {
    this.props.socket.emit('new message', msg) 
  }
}

export default Chat;