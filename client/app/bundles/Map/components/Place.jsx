import React, { PropTypes } from 'react';
import { distance } from '../helpers/mapHelpers';

export default class Place extends React.Component {
	static propTypes = {
		place: PropTypes.object.isRequired,
		updatePlace: PropTypes.func.isRequired,
		deletePlace: PropTypes.func.isRequired,
	}

	_handleCheckbox () {
		this.props.updatePlace(this.props.place.assignment.id);
	}

	_handleDelete() {
		this.props.deletePlace(this.props.place.assignment.id);
	}

	determineDistance() {
		const { userLocation, place } = this.props;
		return distance(userLocation.lat, userLocation.lng, place.place.location.lat, place.place.location.lng);
	}

	render () {
		const { place } = this.props;
		return (
			<li
				className={"place " + place.assignment.pu_del}
			>
				<input onChange={this._handleCheckbox.bind(this)} type="checkbox" checked={place.assignment.delivered} />
				<span className="place-name">{place.place.name + " "}{this.determineDistance().toFixed(1)}</span>
				{place.assignment.delivered ? <span className="delete-button" style={{cursor: 'pointer'}} onClick={this._handleDelete.bind(this)}>Delete</span> : <span />}
			</li>
		)
	}
}