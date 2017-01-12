import React, { PropTypes } from 'react';
import Moment from 'moment';

import SearchInput from './SearchInput.jsx';

export default class Driver extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			keepOpen: false
		}
	}

	_handleClick () {
		this.props._setZoom(12);
		this.setState({keepOpen: !this.state.keepOpen});
	}

	_handleSelection (key, coords) {
		this.props._handleSelected(key);
		this.props._setCenter(coords);
	}

	render () {
		const { user } = this.props;
		const { places } = this.props;
		let lat = user.coordinates.lat;
		let lng = user.coordinates.lng;
		let selected = this.props.selected == user.id

		return (
			<div
				key={user.id}
				className={selected || this.state.keepOpen ? "selected" : "not-selected"}
				onClick={this._handleClick.bind(this)}
				onMouseEnter={this._handleSelection.bind(this, `${user.id}`, [lat, lng])}
				onMouseLeave={this.props._handleDeselect.bind(this)}
			>
				<h1>{user.name}</h1>
				<p>User ID: {user.id}</p>
				<p>Latitude: {lat} Longitude: {lng}</p>
				<p>Last Updated: {Moment(user.updated_at).calendar()}</p>
				<SearchInput userID={user.id}/>
				<ul>
					{places.map((place) => {
						return <li key={Math.random()}>{place.name}</li>
					})}
				</ul>
			</div>
		)
	}
}