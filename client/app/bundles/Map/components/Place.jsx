import React, { PropTypes } from 'react';

export default class Place extends React.Component {
	static propTypes = {
		place: PropTypes.object.isRequired,
	}

	render () {
		const { place } = this.props;
		return (
			<li
				className="place"
				onClick={() => console.log(place.place.name)}
			>
				<input onChange={(e) => console.log(e)} type="checkbox" checked={place.assignment.delivered} />{place.place.name} | {place.assignment.pu_del}
			</li>
		)
	}
}