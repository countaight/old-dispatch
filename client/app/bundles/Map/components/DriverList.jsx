import React, { PropTypes } from 'react';
import Moment from 'moment';

export default class Map extends React.Component {
	_handleClick () {
		this.props._setZoom(12);
	}

	_handleSelection (key, coords) {
		this.props._handleSelected(key);
		this.props._setCenter(coords);
	}
	_renderDrivers () {
		return (
			this.props.users.map((user) => {
				let initialLat = parseFloat(JSON.parse(user.coordinates).initialLat);
				let initialLong = parseFloat(JSON.parse(user.coordinates).initialLong);
				let selected = this.props.selected == user.id
				 return (
				 	<div
				 		key={user.id}
				 		className={selected ? "selected" : "not-selected"}
				 		onClick={this._handleClick.bind(this)}
				 		onMouseEnter={this._handleSelection.bind(this, `${user.id}`, [initialLat, initialLong])}
				 		onMouseLeave={this.props._handleDeselect.bind(this)}
				 	>
				 		<h1>{user.name}</h1>
				 		<p>Latitude: {initialLat} Longitude: {initialLong}</p>
				 		<p>Last Updated: {Moment(user.updated_at).calendar()}</p>
				 	</div>
				 )
			})
		)
	}

	render () {
		return (
			<aside>
				{this._renderDrivers()}
			</aside>
		)
	}
}