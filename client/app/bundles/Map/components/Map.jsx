import React, { PropTypes } from 'react';
import GoogleMap from'google-map-react';

import MapMarker from './MapMarker.jsx';

export default class Map extends React.Component {
	constructor (props) {
		super(props);
		this.currentUserCoords = JSON.parse(this.props.currentUser.coordinates)
		this.state = {
			initCenter: [parseFloat(this.currentUserCoords.initialLat), parseFloat(this.currentUserCoords.initialLong)]
		}
	}

	_distanceToMouse (markerPos, mousePos, markerProps) {
		console.log(markerPos.lat - mousePos.lat);
	}

	_getMapStyle (maps) {
		return {
			styles: [
			            {
			              featureType: 'all',
			              stylers: [
			                { saturation: -100 }
			              ]
			            },{
			              featureType: 'road.arterial',
			              elementType: 'geometry',
			              stylers: [
			                { hue: '#00ffee' },
			                { saturation: 50 }
			              ]
			            },{
			              featureType: 'poi.business',
			              elementType: 'labels',
			              stylers: [
			                { visibility: 'off' }
			              ]
			            }
			          ]
		}
	}

	_getLocation () {
		navigator.geolocation.getCurrentPosition((e) => {
			this._setCenter([e.coords.latitude, e.coords.longitude])
		})
	}

	_setCenter (coords) {
		this.setState({
			initCenter: coords
		})
	}

	_renderMarkers () {
		return (
			this.props.users.map((user) => {
				let initialLat = parseFloat(JSON.parse(user.coordinates).initialLat);
				let initialLong = parseFloat(JSON.parse(user.coordinates).initialLong);
				 return <MapMarker key={user.id} lat={initialLat} lng={initialLong} text={user.name} />
			})
		)
	}

	render () {
		return (
			<div style={{height: 400, width: '100%'}}>
				<h1>Map with markers</h1>
				<GoogleMap
					bootstrapURLKeys={{key: 'AIzaSyB2Chv-sdSPphlh-IsBKXfdzY8zUKqglww'}}
					center={this.state.initCenter}
					defaultZoom={12}
					options={this._getMapStyle}
				>
					{this._renderMarkers()}
				</GoogleMap>
				{"\n\n"}
				<button onClick={this._getLocation.bind(this)}>My Location</button>
			</div>
		)
	}
}