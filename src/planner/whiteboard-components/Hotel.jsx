import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

class Hotel  extends Component {

  componentWillMount() {

    axios
      .get('http://localhost:8080/trips/7/hotel')
      .then((res)=> {
        console.log("client made a request!")
        console.log(res)
      });

  }


  render () {
    return (
      <div>
          <h1> this is the hotels page </h1>
          <div id="flights-container">
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
          <Card title={'Eiffel Tower'} rating={'4.2'} address={'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'}/>
        </div>
      </div>
    )
  }
}

export default Hotel