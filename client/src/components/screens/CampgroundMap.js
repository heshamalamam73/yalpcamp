import React , {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFobW91ZG9raWx5IiwiYSI6ImNraHJvazltMDQyMWMyc2w2dTVsOWthaWoifQ.3VZKZXPcOEPCaQki7K6Lhg';

class CampgroundMap extends React.Component {
  constructor(props) {
super(props);
this.state = {
lng: this.props.geometry.coordinates[0] || 9.1334,
lat: this.props.geometry.coordinates[1] || 45.7338,
zoom: 10
};
  }
  componentDidMount() {
const map = new mapboxgl.Map({
container: this.mapContainer,
style: 'mapbox://styles/mapbox/streets-v11',
center: [this.state.lng, this.state.lat],
zoom: this.state.zoom
});
    map.on('move', () => {
this.setState({
lng: map.getCenter().lng.toFixed(4),
lat: map.getCenter().lat.toFixed(4),
zoom: map.getZoom().toFixed(2)
});
});
  }
render() {
return (
<div className='maps'>
<div  className='sidebarStyle'>
<div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div></div>
<div ref={el => this.mapContainer = el} className='mapContainer' />
</div>
)
}
}



export default CampgroundMap; 