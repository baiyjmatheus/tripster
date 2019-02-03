import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
require('dotenv').config()

const mapStyles = {
  width: '100%',
  height: '100%',
  color: 'green'
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
    const long = this.props.trip.hotels[0].long
    const latt = this.props.trip.hotels[0].latt
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={ {
         lat: this.props.trip.trip[0].latt,
         lng: this.props.trip.trip[0].long
        }}
      >
        {
          this.props.trip.attractions.map(attraction => {
            return  <Marker
                onClick={this.onMarkerClick}
                name={attraction.name}
                position={{lat: attraction.latt, lng: attraction.long}}
              />
          })
        }
        {
          this.props.trip.events.map(event => {
            return  <Marker
                onClick={this.onMarkerClick}
                name={event.name}
                position={{lat: event.latt, lng: event.long}}
              />
          })
        }
        {
          this.props.trip.hotels.map(hotel => {
            return  <Marker
                onClick={this.onMarkerClick}
                name={hotel.name}
                position={{lat: hotel.latt, lng: hotel.long}}
              />
          })
        }


        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
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