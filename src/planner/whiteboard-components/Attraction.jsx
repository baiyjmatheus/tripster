import React, { Component } from 'react';
import Card from './Card.jsx';

class Attraction  extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      attractions: null,
    }
  }


  componentWillMount() {
    console.log("request should be emitted")
    this.props.socket.emit('attractions request')
    this.props.socket.on('attractions data', attractionData => {
      console.log("socket works!")
      this.setState({attractions: attractionData});
      console.log(this.state.attractions)
    })
  }

  render () {
    const attractionArray = this.state.attractions

    if (attractionArray){
      const attractionItem = attractionArray.map( attraction => {
       return <Card key={Math.random()} title={attraction.name} rating={attraction.rating} address={attraction.address} imgSrc={attraction.img} location={attraction.location} price={attraction.price}/>
      })

      return (
        <div>
            <h1> this is the Attractions page </h1>
             <div id="flights-container">
                {attractionItem}
            </div>
        </div>
      )
    } else {
      return (
        <div>
            <h1> Selecting the best Attractions for you! </h1>
        </div>
      )
    }

  }
}

export default Attraction;