import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    }
  }

  render() {
    const { redirect } = this.state;

     if (redirect) {
       return (<Redirect to='/trips'/>);
     } else {
      return (
          <main id="login-container">

          <section id="login">
            <h1>Get started</h1>
            <form action="/login" method="POST" onSubmit={ this.handleLogin } >
              <input type="email" name="email" placeholder="Email"/>
              <input type="text" name="name" placeholder="Name"/>
              <button>Login</button>
            </form>
          </section>

          <aside id="info-container">
            <div id="info">

                <br/>
                <br/>
              <header id="info-header">
                <h1>We are Tripster</h1>
              </header>
              <section id="info-body">
                <br/>
                
                <br/>
                <p>Welcome to Tripster, your one destination for all of your trip planning needs. Finding flights, lodging, attractions and more has never been easier.</p>
                <p>Here's how to get started:</p>
                <ul>
                  <li> &nbsp; 1. Login</li>
                  <li> &nbsp; 2. Create or join a trip</li>
                  <li> &nbsp; 3. Invite your friends</li>
                  <li> &nbsp; 4. Start planning!</li>
                </ul>
                <h3 className="catchphrase">Travelling together is always better</h3>
              </section>
            </div>
            
            </aside>

          </main>
      )}
  }

  handleLogin = (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: e.target.email.value
    }
    axios.post('http://192.168.30.198:8080/login', user)
      .then((res) => {
        const cookies = new Cookies();
        cookies.set('user_id', res.data.id);
        this.setState({ redirect: true});
      });
  }
}

export default Login;