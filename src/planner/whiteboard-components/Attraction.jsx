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

    this.props.socket.on('attractions Data Museum', attractionMuseum => {
      this.setState({attractions: [...this.state.attractions, ...attractionMuseum]});
      console.log("mus", attractionMuseum)
    })


    this.props.socket.on('attractions Data Parks', attractionPark=> {
      this.setState({attractions: [...this.state.attractions, ...attractionPark]});
      console.log("park", attractionPark)
    })

    this.props.socket.on('attractions Data Restaurant', attractionRestaurants=> {
      this.setState({attractions: [...this.state.attractions, ...attractionRestaurants]});
      console.log("res", attractionRestaurants)
    })

    this.props.socket.on('attractions Data Stadium', attractionStadiums=> {
      this.setState({attractions: [...this.state.attractions, ...attractionStadiums]});
      console.log("stadium", attractionStadiums)
    })

    this.props.socket.on('attractions Data Spa', attractionSpas=> {
      this.setState({attractions: [...this.state.attractions, ...attractionSpas]});
      console.log("spa", attractionSpas)
    })


    this.props.socket.on('attractions Data ShoppingMall', attractionShoppingMalls=> {
      this.setState({attractions: [...this.state.attractions, ...attractionShoppingMalls]});
      console.log("ShoppingMall", attractionShoppingMalls)
    })


    this.props.socket.on('attractions Data Zoo', attractionZoos=> {
      this.setState({attractions: [...this.state.attractions, ...attractionZoos]});
      console.log("zoo", attractionZoos)
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