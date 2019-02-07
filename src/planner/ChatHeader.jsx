import React, { Component } from 'react';

class ChatHeader extends Component {
  render() {
    let count = 0
    const users = this.props.users.map((userColor) => {
      return (
        <div>
        {/*<img className="avatar" src="https://12091248091248:8080/img/" />*/}
          <img className="avatar" src={this.selectIcon} alt="" />
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

  selectIcon = () = {
    const icons = ['http://172.46.0.100:8080/img/untitled-3.png', 'http://172.46.0.100:8080/img/untitled-2.png', 'http://172.46.0.100:8080/img/untitled-1.png']
    if (count < 4) {
      count++
    } else {
      count = 0
    }
    return icons[count - 1]
    
  }

}

export default ChatHeader;