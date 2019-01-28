import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import Planner from '../planner/Planner.jsx';
import axios from 'axios';

class Selection extends Component {
  render() {
    const backgroundStyle = (url) => {
        return {
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }
    }
    return (


      <main id="selection-container" style={backgroundStyle('https://images.unsplash.com/photo-1484544808355-8ec84e534d75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1966&q=80')}>
        <aside id="selection-create" style={{backgroundColor: 'transparent'}}>
          <form action="/trips/create" method="POST" onSubmit={this.createTrip}>

            <div id="date-selection">
              <input type="date" name="start" placeholder='Start Date'/>
              <input type="date" name="end" placeholder='End Date'/>
            </div>

            <input type="text" name="origin" placeholder='Origin'/>
            <input type="text" name="destination" placeholder='Destination'/>
            <button>Create</button>
          </form>
        </aside>

        <section id="selection-join" style={{backgroundColor: 'transparent'}}>
          <form action="/trips/join"  method= "POST" onSubmit={this.joinTrip}>
            <input type="text" name="code" placeholder='Trip Code'/>
            {/*<Link to='/trips/join'><button>Join</button></Link> */}
            <button> Join </button>
          </form>
        </section>
      </main>
    );
  }

  createTrip = (evt) => {
    evt.preventDefault();
    const newTrip = {
      start_date: evt.target.start.value,
      end_date: evt.target.end.value,
      origin: evt.target.origin.value,
      destination: evt.target.destination.value
    }

    axios.post('http://localhost:8080/trips/create', newTrip)
    .then((res) => {
      window.location.replace(`http://localhost:3000/#/trips/${res.data.id}`);
      // window.location.href(`http://localhost:3000/#/trips/${res.data.id}`);
    });
  }


  joinTrip = (evt) => {
    evt.preventDefault();
    const tripCode = {trip_id: evt.target.code.value} ;


     axios.post(`http://localhost:8080/trips/join`, tripCode )
      .then((res) => {



        // console.log("res " , res)
      // if(res.data.exists){
      window.location.replace(`http://localhost:3000/#/trips/${tripCode}`);
      window.location.href(`http://localhost:3000/#/trips/${tripCode}`);
      // } else {
      // window.location.replace(`http://localhost:3000/#/trips`);
      // window.location.href(`http://localhost:3000/#/trips`);
      // }
    });


  }
}

export default Selection;