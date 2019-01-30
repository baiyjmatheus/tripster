import React, { Component } from 'react';

class Overview extends Component {
  render() {
    return (
      <aside id="summary" className="full-height">
        <i className="fas fa-map-marker-alt"></i>

        <div id="progress">
          <ul id="steps">
            <li><i className="fas fa-user-friends"></i></li>
            <li><i className="fas fa-plane-departure"></i></li>
            <li><i className="fas fa-bed"></i></li>
            <li><i className="fas fa-dungeon"></i></li>
            <li><i className="fas fa-ticket-alt"></i></li>
          </ul>
        </div>
      </aside>
    );
  }
}

export default Overview;