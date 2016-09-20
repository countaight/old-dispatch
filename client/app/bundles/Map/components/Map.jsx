import React, { PropTypes } from 'react';
import GoogleMap from'google-map-react';

import MapMarker from './MapMarker.jsx';


export default class Map extends React.Component {
	constructor (props) {
		super(props);
		this.currentUserCoords = JSON.parse(this.props.currentUser.coordinates)
		this.state = {
			initCenter: [
										parseFloat(this.currentUserCoords.initialLat),
										parseFloat(this.currentUserCoords.initialLong)
									],
			zoom: 9
		}
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

	_handleSelected (key) {
		console.log(key)
	}

	_setCenter (coords) {
		this.setState({
			initCenter: coords,
			zoom: 12
		})
	}

	_renderMarkers () {
		return (
			this.props.users.map((user) => {
				let initialLat = parseFloat(JSON.parse(user.coordinates).initialLat);
				let initialLong = parseFloat(JSON.parse(user.coordinates).initialLong);
				 return <MapMarker key={user.id} lat={initialLat} lng={initialLong} title={user.name} lastUpdated={user.updated_at} />
			})
		)
	}

	render () {
		return (
			<div className={'react-map'}>
				<h1 className={'map-title'}>Map with markers</h1>
				<div className={'google-map-component'}>
					<GoogleMap
						bootstrapURLKeys={{key: 'AIzaSyB2Chv-sdSPphlh-IsBKXfdzY8zUKqglww'}}
						center={this.state.initCenter}
						onChildMouseEnter={this._handleSelected}
						options={this._getMapStyle}
						zoom={this.state.zoom}
					>
						{this._renderMarkers()}
					</GoogleMap>
				</div>
				<aside>
					<ul>
						<li>Want to see</li>
						<li>If this indeed</li>
						<li>works</li>
					</ul>
				</aside>
				<hr />
				<button className={'locator-button'} onClick={this._getLocation.bind(this)}>My Location</button>
			</div>
		)
	}
}