import React, { Component } from 'react';
import { Route, Link, Switch, HashRouter}  from 'react-router-dom';
// import createBrowserHistory from "history/createBrowserHistory";
import Start from './Start.jsx' ;
import Flight from './Flight.jsx'
// import Hotel from './Hotel.jsx'
// import Event from './Event.jsx'
// import Attraction from './Attraction.jsx'


class Whiteboard extends Component {



  render() {
    const tripId = 3;
    // const customHistory = createBrowserHistory();



      return (
      <main id="whiteboard" className="full-height">

         <div>
        <div id="plan-status">
          <h1>Status bar</h1>
        </div>
        <hr />

          <HashRouter >
          <nav>
            <ul className="nav navbar-nav">
              <li><Link to={`${match.url}`}> Start </Link></li>

              <li><Link to={`/trips/${tripId}/flight`}> Flights </Link></li>
              {/*
              <li><Link to={`/trips/${this.props.trip_id}/hotel`}> Hotels </Link></li>
              <li><Link to={`/trips/${this.props.trip_id}/events`}> Events </Link></li>
              <li><Link to={`/trips/${this.props.trip_id}/attractions`}> Attractions </Link></li> */}
            </ul>
           </nav>

          <Switch>
           <Route  path={`${match.url}`} component={Start}/>
          <Route  path={`/trips/${tripId}/flight`} component={Flight}/>
           {/*
           <Route path={`/trips/${this.props.trip_id}/hotel`} component={Hotel}/>
           <Route path={`/trips/${this.props.trip_id}/events`} component={Event}/>
           <Route path={`/trips/${this.props.trip_id}/attractions`} component={Attraction}/> */}
          </Switch>

        </HashRouter>
        </div>
      </main>
    );

  }
}


// class Start extends Component {
//   render(){
//     return (
//       <div>
//         <h1> start </h1>
//       </div>
//     )
//   }
// }

// class Flight extends Component {
//   render() {
//     return (
//       <div>
//        <h1> Flight Page </h1>
//       </div>
//     );
//   }
// }

// class Hotel extends Component {
//   render(){
//     return (
//       <div>
//         <h1> start </h1>
//       </div>
//     )
//   }
// }

// class Event extends Component {
//   render(){
//     return (
//       <div>
//         <h1> start </h1>
//       </div>
//     )
//   }
// }

// class Attraction extends Component {
//   render(){
//     return (
//       <div>
//         <h1> start </h1>
//       </div>
//     )
//   }


export default Whiteboard;



  // <HashRouter>
  //       <div>
  //         <Route exact path='/' component={ Login } />
  //         <Route path='/trips/:trip_id' component={ Planner }/>
  //         <Route path='/trips' component={ Selection }/>
  //       </div>
  //     </HashRouter>



// <Switch>
//   <Route exact path="/" component={Start}/>
//   <Route path="/flight" component={Flight}/>
//   <Route component={NoMatch}/>
// </Switch><HashRouter>


