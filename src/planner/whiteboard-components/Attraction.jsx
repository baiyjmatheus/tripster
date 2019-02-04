import React, { Component } from 'react';
import Card from './Card.jsx';
import attractionDataArray from './attractionData.json';
import { Redirect } from 'react-router-dom';

class Attraction  extends Component {

  constructor() {
    super();
    this.state = {
      counter: 0,
      redirect: false,
      attractions: [], //replace [] with attractionDataArray if you want to use JSON DATA data
      filteredAttractions: [],
      filterTypes: []
    }
  }

//*** changed the attractions state back to use the saved JSON data instead of api **//
  addAmusementItem = (socketEventName, socket)=> {

   // const properSocketEmitData = JSON.parse(socketEmitData)
     socket.on(socketEventName, socketEmitData => {
        this.setState({attractions: [...this.state.attractions, ...socketEmitData]})
      })

  }


  componentWillMount() {
    console.log("request should be emitted")
//*** COMMENTED OUT ON PURPOSE DO NOT DELETE !!! **//
    if (this.state.attractions.length === 0 ){

      const socketVariable = this.props.socket

      socketVariable.emit('attractions request', this.props.tripId)

      this.addAmusementItem('attractions data', socketVariable )
      this.addAmusementItem('attractions Data amusement', socketVariable)
      // this.addAmusementItem('attractions Data aquarium', socketVariable)
      // this.addAmusementItem('attractions Data ArtGallery', socketVariable)
      // this.addAmusementItem('attraction Data Casino', socketVariable)
      // this.addAmusementItem('attractions Data Museum', socketVariable)
      // this.addAmusementItem('attractions Data Parks', socketVariable)
      // this.addAmusementItem('attractions Data Restaurant', socketVariable)
      // this.addAmusementItem('attractions Data Stadium', socketVariable)
      // this.addAmusementItem('attractions Data Spa', socketVariable)
      // this.addAmusementItem('attractions Data ShoppingMall', socketVariable)
      // this.addAmusementItem('attractions Data Zoo', socketVariable)

    console.log("made api calls")

    } else {

      console.log("already in state!")
    }

  }

  render () {
  const checkBox = (e) => {
    const typeName = e.target.name
    const typesArray = this.state.filterTypes

    const i = typesArray.indexOf(typeName)


    if ( i === -1) {
      this.setState({filterTypes:[...typesArray, typeName]})
    } else {
      const x = typesArray.splice(i, 1)
      this.setState({filterTypes: typesArray})
    }

    console.log("checked box!", this.state.filterTypes)
  }

    console.log("the state", this.state.attractions)




  const matchType = (e) => {
    e.preventDefault()

    this.setState({filteredAttractions : []})

    const array = this.state.attractions
    const filterTypesArray = this.state.filterTypes

    const filteredList = []

    filterTypesArray.forEach(function(category){
      function filterType(item){
          if(item.type === category){
            return true
          }
      }

      var testFilter = array.filter(filterType)


      testFilter.forEach(function(item){
        filteredList.push(item)
      })
    })

    this.setState({filteredAttractions : filteredList })

  }


    const attractionArray = this.state.attractions
    const filterAttractionsArray = this.state.filteredAttractions

    if (filterAttractionsArray.length){

      const filterItem = filterAttractionsArray.map( filteredAttraction => {
        return <Card key={Math.random()} title={filteredAttraction.name} rating={filteredAttraction.rating} address={filteredAttraction.address} imgSrc={filteredAttraction.img} location={filteredAttraction.location} price={filteredAttraction.price} type={filteredAttraction.type} />
      })

      return (

         <div>
            <h1> this is the Attractions page </h1>

            <div id="filter-boxes">
                <form>
                amusement park : <input type="checkbox" name="amusement_park" onClick={checkBox}  />
                aquarium : <input type="checkbox" name="aquarium" onClick={checkBox} />
                point of interest : <input type="checkbox" name="point_of_interest" onClick={checkBox} />
                art gallery : <input type="checkbox" name="art_gallery" onClick={checkBox} />
                casino : <input type="checkbox" name="casino" onClick={checkBox} />
                museum : <input type="checkbox" name="museum" onClick={checkBox} />
                park : <input type="checkbox" name="park" onClick={checkBox} />
                restaurant : <input type="checkbox" name="restaurant" onClick={checkBox} />
                stadium : <input type="checkbox" name="stadium" onClick={checkBox} />
                spa : <input type="checkbox" name="spa" onClick={checkBox} />
                zoo : <input type="checkbox" name="zoo" onClick={checkBox} />
                shopping mall: <input type="checkbox" name="shopping_mall" onClick={checkBox} />
                <button onClick = {matchType}> Filter Now </button>
              </form>
            </div>

            <div id="flights-container">
                {filterItem}
            </div>
        </div>
      )

    } else {

      const attractionItem = attractionArray.map( attraction => {
         return <Card key={Math.random()} title={attraction.name} rating={attraction.rating} address={attraction.address} imgSrc={attraction.img} location={attraction.location} price={attraction.price} type={attraction.type} />
      })

      return (

         <div>
            <h1> this is the Attractions page </h1>

            <div id="filter-boxes">
              <form>
                amusement park : <input type="checkbox" name="amusement_park" onClick={checkBox} />
                aquarium : <input type="checkbox" name="aquarium" onClick={checkBox} />
                point of interest : <input type="checkbox" name="point_of_interest" onClick={checkBox} />
                art gallery : <input type="checkbox" name="art_gallery" onClick={checkBox} />
                casino : <input type="checkbox" name="casino" onClick={checkBox} />
                museum : <input type="checkbox" name="museum" onClick={checkBox} />
                park : <input type="checkbox" name="park" onClick={checkBox} />
                restaurant : <input type="checkbox" name="restaurant" onClick={checkBox} />
                stadium : <input type="checkbox" name="stadium" onClick={checkBox} />
                spa : <input type="checkbox" name="spa" onClick={checkBox} />
                zoo : <input type="checkbox" name="zoo" onClick={checkBox} />
                shopping mall: <input type="checkbox" name="shopping_mall" onClick={checkBox} />
                <button onClick = {matchType}> Filter Now </button>
              </form>
            </div>

            <div id="flights-container">
                {attractionItem}
            </div>
        </div>
      )
    }
  }



}



export default Attraction;

