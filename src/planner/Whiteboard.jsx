import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';

import Start from './whiteboard-components/Start.jsx';
import Flight from './whiteboard-components/Flight.jsx';
import Hotel from './whiteboard-components/Hotel.jsx';
import Event from './whiteboard-components/Event.jsx';
import Attraction from './whiteboard-components/Attraction.jsx'

class Whiteboard extends Component {
  render() {
    const url = this.props.tripURL
    console.log("params: ", this.props.tripURL)
    return (
    <Router>
      <main id="whiteboard" className="full-height">
        <div id="plan-status">
          <h1>Status bar</h1>
          {/* <ul>
            <li><Link to={`${url}`}>start </Link></li>
            <li><Link to={`${url}/flight`} > flight</Link></li>
            <li><Link to={`${url}/hotel`} > hotel</Link></li>
             <li><Link to={`${url}/event`} > event</Link></li>
            <li><Link to={`${url}/attraction`} > attraction</Link></li>
          </ul> */}
        </div>
        <hr />
         <div id="suggestion-container">
          <Switch>

            <Route  exact path={`${url}`} render={() => <Start socket={this.props.socket}/>}/>
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

// class Home extends Component {
//   render(){
//     return (
//       <div>
//         <h1> this is the home page </h1>
//       </div>
//     )
//   }
// }

// class Flight  extends Component {
//   render () {
//     return (
//       <div>
//         <h1> this is the flights page </h1>
//       </div>
//     )
//   }
// }

// class Hotel  extends Component {
//   render () {
//     return (
//       <div>
//         <h1> this is the hotels page </h1>
//       </div>
//     )
//   }
// }

// class Event  extends Component {
//   render () {
//     return (
//       <div>
//         <h1> this is the event page </h1>
//       </div>
//     )
//   }
// }

// class Attraction  extends Component {
//   render () {
//     return (
//       <div>
//         <h1> this is the attractions page </h1>
//       </div>
//     )
//   }
// }

export default Whiteboard;