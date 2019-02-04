import React, {Component} from 'react';
import { AnimatedSwitch } from 'react-router-transition';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


import Login from './login/Login.jsx';
import Planner from './planner/Planner.jsx';
import Selection from './selection/Selection.jsx';
import Summary from './summary/Summary.jsx';

class App extends Component {

  render() {
    return (
      <Router>
        <AnimatedSwitch atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper">
          <Route exact path='/' component={ Login } />
          <Route exact path='/trips/:trip_id' component={ Planner }/>
          <Route exact path='/trips' component={ Selection }/>
          <Route exact path='/trips/:trip_id/summary' component={ Summary }/>
        </AnimatedSwitch>
      </Router>  
      
    );
  }
}
export default App;
