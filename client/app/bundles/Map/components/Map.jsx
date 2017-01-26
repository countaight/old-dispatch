import React, { PropTypes } from 'react';
import GoogleMap from'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import _ from 'lodash';

import MapMarker from './MapMarker.jsx';
import DriverList from './DriverList.jsx';

export default class Map extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			currentUser: PropTypes.object.isRequired,
			users: PropTypes.array.isRequired
		})
	}

	ws: null;

	constructor (props) {
		super(props);
		this.currentUserCoords = this.props.data.currentUser.coordinates
		this.state = {
			initCenter: [
						this.currentUserCoords.lat,
						this.currentUserCoords.lng
						],
			zoom: 9,
			selectedKey: null,
			loadedUsers: this.props.data.users,
		}
	}

	componentDidMount () {
		const uri = "ws://" + window.document.location.host + "/mapsocket";
		const ws = new WebSocket(uri);

		this.ws = ws

		ws.onopen = (e) => {
			console.log('Connected');
			ws.send(this.props.data.currentUser.name + "'s Map has connected!");
		};

		ws.onmessage = (e) => {
			const findJSON = e.data.search("{");
			findJSON == 0 ? this._updateUser(JSON.parse(e.data)) : console.log(e.data);
		}
	}

	componentWillUnmount () {
		this.ws.close();
		this.ws = null;
	}

	_updateUser (loadUser) {
		const { loadedUsers } = this.state;

		const editUser = loadedUsers.filter((user) => user.id == loadUser.id)[0];

		const indexUser = loadedUsers.indexOf(editUser);

		const editedUser = {
			...editUser,
			coordinates: loadUser.coordinates,
			updated_at: loadUser.updated_at
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
		const coordinates = _.map(this.props.users, (user) => { return user.user.coordinates })
		
		const sortLat = _.orderBy(coordinates, ['lat'], ['desc'])

		const sortLng = _.orderBy(coordinates, ['lng'], ['asc'])

		const bounds = {
			nw: {
				lat: _.first(sortLat).lat,
				lng: _.first(sortLng).lng
			},
			se: {
				lat: _.last(sortLat).lat,
				lng: _.last(sortLng).lng
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
				let lat = user.user.coordinates.lat;
				let lng = user.user.coordinates.lng;
				return <MapMarker key={user.user.id} lat={lat} lng={lng} title={user.user.name} lastUpdated={user.user.updated_at} selectedKey={this.state.selectedKey} id={user.user.id}/>
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
						//onChildMouseEnter={this._handleSelected.bind(this)}
						//onChildMouseLeave={this._handleDeselect.bind(this)}
						onClick={this._setCenter.bind(this)}
						onChildClick={this._handleSelected.bind(this)}
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