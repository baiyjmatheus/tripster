import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'


class Whiteboard extends Component {
  render() {
    return (
    <Router>
      <main id="whiteboard" className="full-height">
        <div id="plan-status">
          <h1>Status bar</h1>
        </div>
        <hr />
         <div>
          <ul>
            <li><Link to="/">About Us </Link></li>
            <li><Link to="/flight"> flight</Link></li>
            <li><Link to="/hotel"> hotel</Link></li>

          </ul>
        </div>
        <div>
        <Switch>

          <Route  path='/flight' component={Flight}/>
          <Route  path='/hotel' component={Hotel}/>
         </Switch>
        </div>
      </main>
    </Router>
    );
  }
}

class Home extends Component {
  render(){
    return (
      <div>
        <h1> this is the home page </h1>
      </div>
    )
  }
}

class Flight  extends Component {
  render () {
    return (
      <div>
        <h1> this is the flights page </h1>
      </div>
    )
  }
}

class Hotel  extends Component {
  render () {
    return (
      <div>
        <h1> this is the hotels page </h1>
      </div>
    )
  }
}

export default Whiteboard;