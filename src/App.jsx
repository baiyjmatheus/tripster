import React, {Component} from 'react';

import { HashRouter, Route, Link } from 'react-router-dom';

import Login from './login/Login.jsx';
import Planner from './planner/Planner.jsx';
import Selection from './selection/Selection.jsx';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path='/' component={ Login } />
          <Route path='/trips/:trip_id' component={ Planner }/>
          <Route path='/trips' component={ Selection }/>
        </div>
      </HashRouter>
      
    );
  }
}
export default App;
