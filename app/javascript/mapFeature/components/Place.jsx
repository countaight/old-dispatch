import React from 'react';
import PropTypes from 'prop-types';
import { distance } from '../helpers/mapHelpers';

export default class Place extends React.Component {
	static propTypes = {
		userLocation: PropTypes.object,
		assignment: PropTypes.object.isRequired,
		updatePlace: PropTypes.func.isRequired,
		deletePlace: PropTypes.func.isRequired,
	}

	_handleCheckbox () {
		this.props.updatePlace(this.props.assignment.id);
	}

	_handleDelete() {
		this.props.deletePlace(this.props.assignment.id);
	}

	getStyle() {
		const { assignment } = this.props;

		let style = {
			height: '100%',
			top: 0,
			right: 0,
		};

		style.position = 'absolute';

		style.backgroundColor = assignment.pu_del == 'DEL' ? '#efc576' : '#80b4ac';

		style.width = this.determineDistance() > 5 ? '100%' : this.determineDistance()/5 * 100 + "%"

		return style
	}

	determineDistance() {
		const { userLocation, assignment } = this.props;
		return distance(userLocation.lat, userLocation.lng, assignment.place.location.lat, assignment.place.location.lng);
	}

	render () {
		const { assignment } = this.props;
		return (
			<li
				className={"place " + assignment.pu_del}
			>
				<div className="progress-bar" style={this.getStyle()}/>
				<input onChange={this._handleCheckbox.bind(this)} type="checkbox" checked={assignment.delivered} />
				<span className="place-name">{assignment.place.name + " "}{this.determineDistance().toFixed(1) + " mile(s) away"}</span>
				{assignment.delivered ? <span className="delete-button" style={{cursor: 'pointer'}} onClick={this._handleDelete.bind(this)}>Delete</span> : <span />}
			</li>
		)
	}
}