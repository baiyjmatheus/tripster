import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div>
        <main id="login-container">
      
        <section id="login">
          <h1>Get started</h1>
          <form action="/login" method="POST">
            <input type="email" name="email" placeholder="Email"/>
            <input type="text" name="name" placeholder="Name"/>
    
            <Link to='/trips'><button>Login</button></Link>
          </form>
        </section>
    
        <aside id="info">
          <header>
            <img class="logo-header" src="/img/travel.png"/>
            <h1>We are Tripster</h1>
          </header>
            
            <h3 class="catchphrase">Travel together is always better</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias officia sequi optio laudantium minus ea dolores quisquam. Ut at officia enim commodi, molestiae repellendus facilis tempore aut, suscipit error debitis.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, totam. Delectus odio natus qui nobis facere at, laudantium veritatis et ullam. Distinctio dignissimos minima sint provident voluptatem harum, sequi incidunt.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, totam. Delectus odio natus qui nobis facere at, laudantium veritatis et ullam. Distinctio dignissimos minima sint provident voluptatem harum, sequi incidunt.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus officia accusantium voluptatem sunt enim incidunt iure quo quibusdam odio, inventore, quos quae, facilis iste praesentium est labore sint delectus consequuntur.</p>
          </aside>
  
        </main>
      </div>
    );
  }
}

export default Login;