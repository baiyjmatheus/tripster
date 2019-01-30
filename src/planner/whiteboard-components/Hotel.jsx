import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

class Hotel  extends Component {

   constructor() {
    super();
    this.state = {
      redirect: false,
      hotels:[],
      key: "secret"
    }
  }

  componentWillMount() {

    axios
      .get('http://localhost:8080/trips/7/hotel')
      .then((res)=> {
        console.log("client made a request!")
        console.log("this is the data" , res)
        this.setState({
          hotels: res.data.hotelData,
          key: res.data.key
        })

        // console.log('picture: ', this.state.hotels[2].photos[0].photo_reference )
        // console.log(getPhoto(this.state.hotels[2].photos[0].photo_reference) )
      });



  }


  render () {
    const hotelsArray = this.state.hotels ;
    const hotelItem = hotelsArray.map( hotel => {
      return <Card key={Math.random()} title={hotel.name} rating={hotel.rating} address={hotel.vicinity} imgSrc={getPhoto(hotel.photos[0].photo_reference, this.state.key)} location={hotel.location} price={(Math.random()*(2000-200)+200).toFixed(2)}/>
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


function getPhoto(photo_reference_id, key){
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${photo_reference_id}&key=${key}`

  return photoUrl
}

export default Hotel