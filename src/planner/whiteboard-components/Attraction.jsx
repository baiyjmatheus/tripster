import React, { Component } from 'react';
import Card from './Card.jsx';
import attractionDataArray from './attractionData.json';

class Attraction  extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      attractions: attractionDataArray,
      filteredAttractions: [],
      filterTypes: []
    }
  }


  componentWillMount() {
    console.log("request should be emitted")



    // ** COMMENTED OUT TO LIMIT API CALLS - TEST DATA IN JSON FILE ** //
    this.props.socket.emit('attractions request')

    // this.props.socket.on('attractions data', attractionData => {
    //   console.log(attractionData)
    //   this.setState({attractions: [...this.state.attractions, ...attractionData]});
    // })

    // this.props.socket.on('attractions Data amusement', attractionDataAM => {
    //   this.setState({attractions: [...this.state.attractions, ...attractionDataAM]});
    //   console.log(attractionDataAM)
    // })

    // this.props.socket.on('attractions Data aquarium', attractionDataAquarium => {
    //   this.setState({attractions: [...this.state.attractions, ...attractionDataAquarium]});
    //   console.log(attractionDataAquarium)
    // })

    // this.props.socket.on('attractions Data ArtGallery', attractionDataArtGallery => {
    //   this.setState({attractions: [...this.state.attractions, ...attractionDataArtGallery]});
    //   console.log("atr", attractionDataArtGallery)
    // })

    // this.props.socket.on('attractions Data Casino', attractionCasino => {
    //   this.setState({attractions: [...this.state.attractions, ...attractionCasino]});
    //   console.log("atr", attractionCasino)
    // })

    // this.props.socket.on('attractions Data Museum', attractionMuseum => {
    //   this.setState({attractions: [...this.state.attractions, ...attractionMuseum]});
    //   console.log("mus", attractionMuseum)
    // })


    // this.props.socket.on('attractions Data Parks', attractionPark=> {
    //   this.setState({attractions: [...this.state.attractions, ...attractionPark]});
    //   console.log("park", attractionPark)
    // })

    // this.props.socket.on('attractions Data Restaurant', attractionRestaurants=> {
    //   this.setState({attractions: [...this.state.attractions, ...attractionRestaurants]});
    //   console.log("res", attractionRestaurants)
    // })

    // this.props.socket.on('attractions Data Stadium', attractionStadiums=> {
    //   this.setState({attractions: [...this.state.attractions, ...attractionStadiums]});
    //   console.log("stadium", attractionStadiums)
    // })

    // this.props.socket.on('attractions Data Spa', attractionSpas=> {
    //   this.setState({attractions: [...this.state.attractions, ...attractionSpas]});
    //   console.log("spa", attractionSpas)
    // })


    // this.props.socket.on('attractions Data ShoppingMall', attractionShoppingMalls=> {
    //   this.setState({attractions: [...this.state.attractions, ...attractionShoppingMalls]});
    //   console.log("ShoppingMall", attractionShoppingMalls)
    // })


    // this.props.socket.on('attractions Data Zoo', attractionZoos=> {
    //   this.setState({attractions: [...this.state.attractions, ...attractionZoos]});
    //   console.log("zoo", attractionZoos)
    // })




    // attempt at a function but the socketEmitData is not a string so getting "undefined" when passed as a variable
    // function addAmusementItem(socketEventName, socketEmitData){
    //   return (this.props.socket.on(socketEventName, socketEmitData => {
    //     this.setState({attractions: [...this.state.attractions, ...socketEmitData]})
    //   }))
    // }

    // addAmusementItem('attractions Data amusement', 'attractionDataAM')



  }


            // messages: [...this.state.messages, msgJSON]

  render () {

  const checkBox = (e) => {
    const typeName = e.target.name
    // const status = e.target.value
    const typesArray = this.state.filterTypes

    const i = typesArray.indexOf(typeName)

    // console.log("this is the index of array, ", i)

    if ( i === -1) {
    //   // const NewArray = typesArray.splice(i,1)
      // console.log(NewArray)
      // this.setState({filterTypes: typesArray.splice(i,1) })
      this.setState({filterTypes:[...typesArray, typeName]})
    } else {
      const x = typesArray.splice(i, 1)
      // console.log("remove this", x)
      // console.log("spliced array", typesArray)
      this.setState({filterTypes: typesArray})
    }

    console.log("checked box!", this.state.filterTypes)
  }
  //check array:



    // console.log ("this is the typename", typeName)

    // var items = matchType(typeName)

    // console.log("these are the new items", items)
    // matchType(typeName)
    // console.log("this is the box:", typeName)

    // if(this.state.filteredAttractions.length > 0){
    //   this.setState({filteredAttractions: [...this.state.filteredAttractions,...items]})
    // } else{
    //   this.setState({filteredAttractions: items})
    // }

    // console.log("the state", this.state.filteredAttractions)




  // const matchType = (type) => {
  //   const array = this.state.attractions
  //   function filterType(item){
  //     if(item.type === type){
  //       return true
  //     }
  // }

  //   var testFilter = array.filter(filterType)

  //   return testFilter
  //   // console.log(testFilter)
  //   // this.setState({})
  // }
    const attractionArray = this.state.attractions

    // if(this.state.filteredAttractions.lengt){
    //   return <h1> no filter </h1>
    // }

    if (attractionArray){
      console.log("these are the filtered attractions", this.state.filteredAttractions)
      const attractionItem = attractionArray.map( attraction => {
       return <Card key={Math.random()} title={attraction.name} rating={attraction.rating} address={attraction.address} imgSrc={attraction.img} location={attraction.location} price={attraction.price} type={attraction.type} />
      })

      return (
        <div>
            <h1> this is the Attractions page </h1>

            <div id="filter-boxes">
              <form>
                amusement park : <input type="checkbox" name="amusement_park" onClick={checkBox} value="false" />
                aquarium : <input type="checkbox" name="aquarium" onClick={checkBox} value="false" />
              </form>
            </div>

             <div id="flights-container">
                {attractionItem}
            </div>
        </div>
      )
    } else {
      return (
        <div>
            <h1> Selecting the best Attractions for you! </h1>

             <div id="filter-boxes">
                <input type="checkbox" />
            </div>
        </div>
      )
    }

  }

}

export default Attraction;




