import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import Start from './Start.jsx';


class Whiteboard extends Component {
  render() {
    const url = this.props.tripURL
    console.log("params: ", this.props.tripURL)
    return (
    <Router>
      <main id="whiteboard" className="full-height">
        <div id="plan-status">
          <h1>Status bar</h1>
        </div>
        <hr />
         <div>
          <ul>
            <li><Link to={`${url}`}>start </Link></li>
            <li><Link to={`${url}/flight`} > flight</Link></li>
            <li><Link to={`${url}/hotel`} > hotel</Link></li>
             <li><Link to={`${url}/event`} > event</Link></li>
            <li><Link to={`${url}/attraction`} > attraction</Link></li>

          </ul>
        </div>
        <div>
        <Switch>
          <Route exact path={`${url}`} component={Start} />
          <Route  path={`${url}/flight`} component={Flight}/>
          <Route  path={`${url}/hotel`}  component={Hotel}/>
          <Route  path={`${url}/event`} component={Event}/>
          <Route  path={`${url}/attraction`}  component={Attraction}/>
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

class Event  extends Component {
  render () {
    return (
      <div>
        <h1> this is the event page </h1>
      </div>
    )
  }
}

class Attraction  extends Component {
  render () {
    return (
      <div>
        <h1> this is the attractions page </h1>
      </div>
    )
  }
}

export default Whiteboard;