import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <form action="">

            <div id="date-selection">
              <input type="date" placeholder='Start Date'/>
              <input type="date" placeholder='End Date'/>
            </div>

            <input type="text" placeholder='Origin'/>
            <input type="text" placeholder='Destination'/>
          </form>
          <Link to='/trips/create'><button>Create</button></Link>
        </aside>
        
        <section id="selection-join" style={{backgroundColor: 'transparent'}}>
          <input type="text" placeholder='Trip Code'/>
          <Link to='/trips/join'><button>Join</button></Link>
        </section>
      </main>
    );
  }
}

export default Selection;