import React, { PropTypes } from 'react';
import GoogleMap from'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import _ from 'lodash';

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
			selectedKey: null,
			ws: {},
			loadedUsers: this.props.users,
		}
	}

	componentWillMount () {
		console.log(this.state.loadedUsers)
		var uri = "ws://" + window.document.location.host + "/mapsocket";
		var ws = new WebSocket(uri);

		this.setState({ ...this.state, ws });

		ws.onopen = (e) => {
			console.log('Connected');
			ws.send(this.props.currentUser.name + "'s Map has connected!");
		};

		ws.onmessage = (e) => {
			const findJSON = e.data.search("{");
			findJSON == 0 ? this._updateUser(JSON.parse(e.data)) : console.log(e.data);
		}
	}

	componentWillUnmount () {
		this.state.ws.close();
		this.setState({ ...this.state, ws: {} })
	}

	_updateUser (loadUser) {
		const { loadedUsers } = this.state;

		const editUser = loadedUsers.filter((user) => user.id == loadUser.id)[0];

		const indexUser = loadedUsers.indexOf(editUser);

		const editedUser = {
			...editUser,
			coordinates: JSON.stringify(loadUser.coordinates)
		};

		loadedUsers[indexUser] = editedUser;

		this.setState({ ...this.state, loadedUsers })
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
		            	featureType: 'road.highway',
		            	elementType: 'geometry',
		            	stylers: [
		            		{ hue: '#ffffb2' },
		            		{ saturation: 80 }
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
			this._setCenter([e.coords.latitude, e.coords.longitude]);
			this._setZoom(12);
		})
	}

	_handleSelected (selectedKey) {
		let newState = { ...this.state, selectedKey }
		this.setState(newState);
	}

	_handleDeselect () {
		this.setState({ ...this.state, selectedKey: null })
	}

	_handleChange ({center, zoom}) {
		this._setCenter(center);
		this._setZoom(zoom);
	}

	_setCenter (coords) {
		this.setState({
			initCenter: coords
		})
	}

	_setZoom (zoom) {
		this.setState({
			zoom
		})
	}

	_zoomToAll () {
		const coordinates = _.map(this.props.users, (user) => { return JSON.parse(user.coordinates) })
		
		const sortLat = _.orderBy(coordinates, ['initialLat'], ['desc'])

		const sortLng = _.orderBy(coordinates, ['initialLong'], ['desc'])

		const bounds = {
		  nw: {
		    lat: parseFloat(_.first(sortLat).initialLat),
		    lng: parseFloat(_.first(sortLng).initialLong)
		  },
		  se: {
		    lat: parseFloat(_.last(sortLat).initialLat),
		    lng: parseFloat(_.last(sortLng).initialLong)
		  }
		};

		const size = {
		  width: 640, // Map width in pixels
		  height: 400, // Map height in pixels
		};

		const {center, zoom} = fitBounds(bounds, size);

		this._setCenter(center);
		this._setZoom(zoom);
	}

	_renderMarkers () {
		return (
			this.state.loadedUsers.map((user) => {
				let initialLat = parseFloat(JSON.parse(user.coordinates).initialLat);
				let initialLong = parseFloat(JSON.parse(user.coordinates).initialLong);
				 return <MapMarker key={user.id} lat={initialLat} lng={initialLong} title={user.name} lastUpdated={user.updated_at} selectedKey={this.state.selectedKey} id={user.id}/>
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
						onChange={this._handleChange.bind(this)}
						onChildMouseEnter={this._handleSelected.bind(this)}
						onChildMouseLeave={this._handleDeselect.bind(this)}
						onClick={this._setCenter.bind(this)}
						options={this._getMapStyle}
						zoom={this.state.zoom}
					>
						{this._renderMarkers()}
					</GoogleMap>
				</div>
				<DriverList
					_handleDeselect={this._handleDeselect.bind(this)}
					_handleSelected={this._handleSelected.bind(this)} 
					_setCenter={this._setCenter.bind(this)}
					_setZoom={this._setZoom.bind(this)}
					selected={this.state.selectedKey}
					users={this.state.loadedUsers}
				/>
				<button onClick={this._zoomToAll.bind(this)}>Fit All</button>
				<hr />
				<button className={'locator-button'} onClick={this._getLocation.bind(this)}>My Location</button>
			</div>
		)
	}
}