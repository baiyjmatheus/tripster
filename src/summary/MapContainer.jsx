import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
require('dotenv').config()

const mapStyles = {
  width: '100%',
  height: '100%',
  color: 'green',
};

export class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}         //Shows the infoWindow to the selected place upon a marker
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    console.log(process.env);
    return (
      <Map
        google={this.props.google}
        zoom={12.5}
        style={mapStyles}
        initialCenter={ {
         lat: this.props.trip.trip[0].latt,
         lng: this.props.trip.trip[0].long
        }}
      >
        {
          this.props.trip.attractions.map(attraction => {
            console.log(attraction)
            return  <Marker
                onClick={this.onMarkerClick}
                title={'Attraction'}
                name={`${attraction.name} | ${attraction.rating} Stars | $${attraction.price}`}
                position={{lat: attraction.latt, lng: attraction.long}}
                icon={{
                  // url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Font_Awesome_5_solid_archway.svg',
                  url: 'http://localhost:8080/img/512px-Font_Awesome_5_solid_archway.png',
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(32, 32)
                }}
              />
          })
        }
        {
          this.props.trip.events.map(event => {
            return  <Marker
                onClick={this.onMarkerClick}
                title={'Event'}
                name={`${event.name} | ${event.rating} Stars | $${event.price}`}
                position={{lat: event.latt, lng: event.long}}
                icon={{
                  url: 'http://localhost:8080/img/font-awesome_4-7-0_ticket_256_0_007dff_none.png',
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(40, 40)
                }}
              />
          })
        }
        {
          this.props.trip.hotels.map(hotel => {
            return  <Marker
                onClick={this.onMarkerClick}
                title={'Hotel'}
                name={`${hotel.name} | ${hotel.rating} Stars | $${hotel.price}`}
                position={{lat: hotel.latt, lng: hotel.long}}
                icon={{
                  url: 'http://localhost:8080/img/font-awesome_4-7-0_bed_256_0_007dff_none.png',
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(35, 35)
                }}
              />
          })
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_KEY
})(MapContainer);