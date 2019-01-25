import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
      <aside id="chat">
        <section id="users">
          <div id="users-icons">
            <div>
              <img className="avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt=""/>
            </div>
            <div>
              <img className="avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt=""/>
            </div>
            <div>
              <img className="avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt=""/>
            </div>
          </div>
          <hr />  
        </section>
        
        
        <section id="message-list">
          <p><strong style={{"color": "tomato"}}>Mike</strong>: JUSTIFY THE CONTENT</p>
          <p><strong style={{"color": "greenyellow"}}>Matt</strong>: BURRITO GENIUS</p>
          <p><strong style={{"color": "yellow"}}>Mariam</strong>: WHAT? I DONT KNOW!</p>
        </section>
        <footer id="chatbar">
            <textarea cols="20" rows="2"></textarea>
          <button><i className="fab fa-telegram-plane"></i></button>
        </footer>
      </aside>
    );
  }
}

export default Chat;