import React, { PropTypes } from 'react';

export default class Place extends React.Component {
	static propTypes = {
		place: PropTypes.object.isRequired,
	}

	_handleCheckbox () {
		this.props.updatePlace(this.props.place.assignment.id);
	}

	render () {
		const { place } = this.props;
		return (
			<li
				className="place"
			>
				<input onChange={this._handleCheckbox.bind(this)} type="checkbox" checked={place.assignment.delivered} /><span>{place.place.name} | {place.assignment.pu_del}</span>
				{place.assignment.delivered ? <span style={{cursor: 'pointer'}} onClick={() => console.log("DELETE")}>Delete</span> : ''}
			</li>
		)
	}
}