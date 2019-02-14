import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import Planner from '../planner/Planner.jsx';
import axios from 'axios';

class Selection extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      id: 0
    }
  }

  render() {
    const { redirect } = this.state;
    // const id = this.state.id

    const backgroundStyle = (url) => {
        return {
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }
    }

    if (redirect) {
      return (<Redirect to={"/trips/"+ this.state.id} />);
    } else {

    return (


      <main id="selection-container" style={backgroundStyle('https://images.unsplash.com/photo-1484544808355-8ec84e534d75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1966&q=80')}>
        <aside id="selection-create" style={{backgroundColor: 'transparent'}}>
          <form action="/trips/create" method="POST" onSubmit={this.createTrip}>
            <input type='text' name='title' placeholder='Title' />

            <input type="text" name="origin" placeholder='Origin'/>
            <input type="text" name="destination" placeholder='Destination'/>

            <div id="date-selection">
              <input type="date" name="start" placeholder='Start Date'/>
              <input type="date" name="end" placeholder='End Date'/>
            </div>
            <button>Create</button>
          </form>
        </aside>

        <section id="selection-join" style={{backgroundColor: 'transparent'}}>
          <form action="/trips/join"  method= "POST" onSubmit={this.joinTrip}>
            <input type="text" name="code" placeholder='Trip Code'/>
            <button> Join </button>
          </form>
        </section>
      </main>
    );
    }
  }

  //function to handle creating a new trip on selection page
  createTrip = (evt) => {
    evt.preventDefault();
    const newTrip = {
      title: evt.target.title.value,
      start_date: evt.target.start.value,
      end_date: evt.target.end.value,
      origin: evt.target.origin.value,
      destination: evt.target.destination.value
    }

    axios.post('http://192.168.30.198:8080/trips/create', newTrip)
    .then((res) => {
      // window.location.replace(`http://localhost:3000/#/trips/${res.data.id}`)
      this.setState({ redirect: true, id: res.data.id });;
    });
  }

//function to handle joining an exisiting trip on selection page
  joinTrip = (evt) => {
    evt.preventDefault();
    const tripCode = {trip_id: evt.target.code.value} ;

     axios.post(`http://192.168.30.198:8080/trips/join`, tripCode ) //should only redirect if trip exists
      .then((res) => {
        if(res.data.exists){
          // window.location.replace(`http://localhost:3000/#/trips/${tripCode.trip_id}`);
          this.setState({ redirect: true, id: tripCode.trip_id });
        } else {
          // window.location.replace(`http://localhost:3000/#/trips`);
          this.setState({ redirect: false });
        }
    });
  }
}

export default Selection;