import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <form action="/trips" method="POST" onSubmit={this.createTrip}>

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
          <input type="text" placeholder='Trip Code'/>
          <Link to='/trips/join'><button>Join</button></Link>
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

    axios.post('http://localhost:8080/trips', newTrip)
    .then((res) => {
      console.log(res.data);
    })
  }
}

export default Selection;