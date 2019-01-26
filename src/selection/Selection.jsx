import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Selection extends Component {
  render() {
    return (
      <main id="selection-container">
        <aside id="selection-create">
          <Link to='/trips/create'><button>Create</button></Link>
        </aside>
        <section id="selection-join">
          <Link to='/trips/join'><button>Join</button></Link>
        </section>
      </main>
    );
  }
}

export default Selection;