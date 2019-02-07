import React, { Component } from 'react';


class ChatHeader extends Component {
  render() {
    const users = this.props.users.map((userColor, index) => {
      return (
        <div>
          <img className="avatar" src={this.rotateIcons(index)} alt="" />
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

  rotateIcons = (num) => {
    if (num > 2) {
      num = num % 3;
    }
    const icons = [ 
    'http://192.168.30.198:8080/img/final-img-0.png', 
    'http://192.168.30.198:8080/img/final-icon-2.png', 
    'http://192.168.30.198:8080/img/final-icon-1.png'
    ]
    return icons[num]
  }
}

export default ChatHeader;