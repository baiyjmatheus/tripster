import React, { Component } from 'react';

class Whiteboard extends Component {
  render() {
    return (
      <main id="whiteboard" className="full-height">
        <div id="plan-status">
          <h1>Status bar</h1>
        </div>
        <hr />
        <div>
          < Flight />
        </div>
      </main>
    );
  }
}

class Flight  extends Component {
  render () {
    return (
      <div>
        <h1> this is the flights page </h1>
      </div>
    )
  }
}

class Hotels  extends Component {
  render () {
    return (
      <div>
        <h1> this is the hotels page </h1>
      </div>
    )
  }
}

export default Whiteboard;