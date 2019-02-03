import React, { Component, PropTypes } from 'react';
import MapContainer from './MapContainer.jsx'
import axios from 'axios';
class Summary extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    console.log(this.props)
    axios.get(`http://localhost:8080/trips/${this.props.match.params.trip_id}/summary`)
      .then(res => {
        const data = res.data;
        this.setState({ data }, () => {
          console.log(this.state)
        })
      })
	}

  render() {
    return (
      <MapContainer />
    );
  }
}

export default Summary;
