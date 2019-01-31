import React, { Component } from 'react';
import Card from './Card.jsx';

class Attraction  extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      attractions: [],
    }
  }


  componentWillMount() {
    console.log("request should be emitted")
    this.props.socket.emit('attractions request')

    this.props.socket.on('attractions data', attractionData => {
      console.log(attractionData)
      this.setState({attractions: [...this.state.attractions, ...attractionData]});
      // console.log(this.state.attractions)
    })

    this.props.socket.on('attractions Data amusement', attractionDataAM => {
      this.setState({attractions: [...this.state.attractions, ...attractionDataAM]});
      console.log(attractionDataAM)
    })

    this.props.socket.on('attractions Data aquarium', attractionDataAquarium => {
      this.setState({attractions: [...this.state.attractions, ...attractionDataAquarium]});
      console.log(attractionDataAquarium)
    })

    this.props.socket.on('attractions Data ArtGallery', attractionDataArtGallery => {
      this.setState({attractions: [...this.state.attractions, ...attractionDataArtGallery]});
      console.log("atr", attractionDataArtGallery)
    })

    this.props.socket.on('attractions Data Casino', attractionCasino => {
      this.setState({attractions: [...this.state.attractions, ...attractionCasino]});
      console.log("atr", attractionCasino)
    })

    //attempt at a function but the socketEmitData is not a string so getting "undefined" when passed as a variable
    // function addAmusementItem(socketEventName, socketEmitData){
    //   return (this.props.socket.on(socketEventName, socketEmitData => {
    //     this.setState({attractions: [...this.state.attractions, ...socketEmitData]})
    //   }))
    // }

    // addAmusementItem('attractions Data amusement', 'attractionDataAM')



  }


            // messages: [...this.state.messages, msgJSON]

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