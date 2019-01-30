import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

class Hotel  extends Component {

   constructor() {
    super();
    this.state = {
      redirect: false,
      hotels:[]
    }
  }

  componentWillMount() {

    axios
      .get('http://localhost:8080/trips/7/hotel')
      .then((res)=> {
        console.log("client made a request!")
        console.log("this is the data" , res)
        this.setState({
          hotels: res.data
        })
      });

  }


  render () {
    const hotelsArray = this.state.hotels ;
    const hotelItem = hotelsArray.map( hotel => {
      return <Card key={Math.random()} title={hotel.name} rating={hotel.rating} address={hotel.vicinity} imgSrc={'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?cs=srgb&dl=architecture-buildings-church-338515.jpg&fm=jpg'} location={hotel.location} price={(Math.random()*(2000-200)+200).toFixed(2)}/>
    // console.log("this is the state: ", this.state.hotels)
  })
    return (
      <div>
          <h1> this is the hotels page </h1>
          <div id="flights-container">
             {hotelItem}
          </div>
      </div>
    )
  }
}

export default Hotel