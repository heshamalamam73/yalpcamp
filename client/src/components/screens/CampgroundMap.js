import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFobW91ZG9raWx5IiwiYSI6ImNraHJvazltMDQyMWMyc2w2dTVsOWthaWoifQ.3VZKZXPcOEPCaQki7K6Lhg';

class CampgroundMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.geometry.coordinates[0] || 9.1334,
      lat: this.props.geometry.coordinates[1] || 45.7338,
      zoom: 5
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    new mapboxgl.Marker()
      .setLngLat([this.state.lng, this.state.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 20 })
          .setHTML(
            `<h3>${this.props.title}  </h3><p>${this.props.location}</p>`
          )
      )
      .addTo(map)
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    map.addControl(new mapboxgl.NavigationControl());

  }
  render() {
    return (
      <div className='maps'>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}



export default CampgroundMap; 