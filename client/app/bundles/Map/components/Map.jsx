import React, { PropTypes } from 'react';
import GoogleMap from 'google-map-react';
import { zoomTo } from '../helpers/mapHelpers';

import MapMarker from './MapMarker.jsx';
import PlaceMarker from './PlaceMarker.jsx';
import DriverList from './DriverList.jsx';

export default class Map extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			currentUser: PropTypes.object.isRequired,
			users: PropTypes.array.isRequired,
			selectedKey: PropTypes.string.isRequired,
			zoom: PropTypes.number.isRequired,
		}),
		actions: PropTypes.shape({
			updateUserPosition: PropTypes.func.isRequired,
			addPlace: PropTypes.func.isRequired,
			selectKey: PropTypes.func.isRequired,
			setZoom: PropTypes.func.isRequired,
			setCenter: PropTypes.func.isRequired,
		})
	}

	ws: null;

	constructor (props) {
		super(props);
		this._updateUserPosition = this.props.actions.updateUserPosition;
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
			findJSON == 0 ? this._updateUserPosition(JSON.parse(e.data)) : console.log(e.data);
		}
	}

	componentWillUnmount () {
		this.ws.close();
		this.ws = null;
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
		this.props.actions.selectKey(selectedKey);
	}

	_handleDeselect () {
		this.props.actions.selectKey("0");
	}

	_handleChange ({center, zoom}) {
		this._setCenter(center);
		this._setZoom(zoom);
	}

	_setCenter (coords) {
		this.props.actions.setCenter(coords);
	}

	_setZoom (zoom) {
		this.props.actions.setZoom(zoom);
	}

	_zoomToAll () {
		const userCoordinates = this.props.data.users.map((user) => {
			return user.user.coordinates
		})
		const {center, zoom} = zoomTo(userCoordinates);
		this._setCenter(center);
		this._setZoom(zoom);
	}

	_revealPlaceMarkers () {
		if (this.props.data.selectedKey === "0") {
			return
		}
		const user = this.props.data.users.filter((user) => user.user.id == this.props.data.selectedKey)[0]

		const placeMarkers = user.places.map((place) => {
			return (
				<PlaceMarker
					key={place.place.id}
					lat={place.place.location.lat}
					lng={place.place.location.lng}
					id={place.assignment.user_id}
					title={place.place.name}
				/>
			)
		})

		return placeMarkers
	}

	_renderMarkers () {
		return (
			this.props.data.users.map((user) => {
				let lat = user.user.coordinates.lat;
				let lng = user.user.coordinates.lng;
				return (
					<MapMarker
						key={user.user.id}
						lat={lat}
						lng={lng}
						title={user.user.name}
						lastUpdated={user.user.updated_at}
						selectedKey={this.props.data.selectedKey}
						id={user.user.id}
					/>
				)
			})
		)
	}

	render () {
		const { actions, data } = this.props;
		return (
			<div className={'react-map'}>
				<h1 className={'map-title'}>Map with markers</h1>
				<div className={'google-map-component'}>
					<GoogleMap
						bootstrapURLKeys={{key: 'AIzaSyB2Chv-sdSPphlh-IsBKXfdzY8zUKqglww'}}
						center={data.initCenter}
						onChange={this._handleChange.bind(this)}
						//onChildMouseEnter={this._handleSelected.bind(this)}
						//onChildMouseLeave={this._handleDeselect.bind(this)}
						onClick={this._setCenter.bind(this)}
						onChildClick={this._handleSelected.bind(this)}
						options={this._getMapStyle}
						zoom={data.zoom}
					>
						{this.props.data.selectedKey === "0" ? this._renderMarkers() : this._renderMarkers().concat(this._revealPlaceMarkers())}
					</GoogleMap>
				</div>
				<DriverList
					_handleDeselect={this._handleDeselect.bind(this)}
					_handleSelected={this._handleSelected.bind(this)} 
					_setCenter={this._setCenter.bind(this)}
					_setZoom={this._setZoom.bind(this)}
					selected={data.selectedKey}
					users={data.users}
					addPlace={actions.addPlace}
					updatePlace={actions.updatePlace}
					deletePlace={actions.deletePlace}
				/>
				<button onClick={this._zoomToAll.bind(this)}>Fit All</button>
				<hr />
				<button className={'locator-button'} onClick={this._getLocation.bind(this)}>My Location</button>
			</div>
		)
	}
}