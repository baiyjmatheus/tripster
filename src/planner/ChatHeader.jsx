import React, { Component } from 'react';

class ChatHeader extends Component {
  render() {
    const users = this.props.users.map((userColor) => {
      return (
        <div>
          <img className="avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" style={{backgroundColor: userColor}} />
        </div>
      );
    });
    return (
      <section id="users">
        <div id="users-icons">
          {users}
        </div> 
      </section>
    );
  }
}

export default ChatHeader;