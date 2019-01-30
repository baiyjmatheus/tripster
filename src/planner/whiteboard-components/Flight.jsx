import React, { Component } from 'react';
import Card from './Card.jsx';
import axios from 'axios';

class Flight  extends Component {
  componentWillMount() {
    axios.get(`http://localhost:8080/trips/${this.props.tripId}/flights`)
      .then((res) => {
        console.log(res);
      });
  }

  render () {
    return (
      <div id="flights-container">
        <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'} price={'38.00'}/>
        <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'} price={'38.00'}/>
        <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'} price={'38.00'}/>
        <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'} price={'38.00'}/>
        <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'} price={'38.00'}/>
        <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'} price={'38.00'}/>
        
      </div>
    )
  }
}

export default Flight;