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
            return  <Marker
                onClick={this.onMarkerClick}
                title={'Attraction'}
                name={attraction.name}
                position={{lat: attraction.latt, lng: attraction.long}}
                icon={{
                  url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Font_Awesome_5_solid_archway.svg',
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(40, 40)
                }}
              />
          })
        }
        {
          this.props.trip.events.map(event => {
            return  <Marker
                onClick={this.onMarkerClick}
                title={'Event'}
                name={`${event.name} | ${event.quality} Stars | $${event.price}`}
                position={{lat: event.latt, lng: event.long}}
                icon={{
                  url: 'https://png2.kisspng.com/sh/af9d75970c39b6e677fde6f41082bbf4/L0KzQYm3VMA1N6R4j5H0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgRqa5xqjJ9vb373PbLAhgNwdZYye95ycD3kgsW0lPlkc5Z5i58AYXO4QbW3hsBjOpQ9SJC6OEW5R4S5VcE2OmM9Tqk9N0GzRIaBTwBvbz==/kisspng-computer-icons-ticket-font-awesome-clip-art-tickets-5ac51d0f0b2c80.1856732515228674710458.png',
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
                  url: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Font_Awesome_5_solid_bed.svg',
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(35, 35)
                }}
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