import React, { PropTypes } from 'react';
import GoogleMap from'google-map-react';

import MapMarker from './MapMarker.jsx';
import DriverList from './DriverList.jsx';


export default class Map extends React.Component {
	constructor (props) {
		super(props);
		this.currentUserCoords = JSON.parse(this.props.currentUser.coordinates)
		this.state = {
			initCenter: [
										parseFloat(this.currentUserCoords.initialLat),
										parseFloat(this.currentUserCoords.initialLong)
									],
			zoom: 9,
			selectedKey: null
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

	_handleSelected (selectedKey) {
		let newState = { ...this.state, selectedKey }
		this.setState(newState);
	}

	_handleDeselect () {
		this.setState({ ...this.state, selectedKey: null })
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
						onChildMouseEnter={this._handleSelected.bind(this)}
						onChildMouseLeave={this._handleDeselect.bind(this)}
						options={this._getMapStyle}
						zoom={this.state.zoom}
					>
						{this._renderMarkers()}
					</GoogleMap>
				</div>
				<DriverList users={this.props.users} selected={this.state.selectedKey} />
				<hr />
				<button className={'locator-button'} onClick={this._getLocation.bind(this)}>My Location</button>
			</div>
		)
	}
}