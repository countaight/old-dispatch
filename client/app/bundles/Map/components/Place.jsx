import React, { PropTypes } from 'react';

export default class Place extends React.Component {
	static propTypes = {
		place: PropTypes.object.isRequired,
	}

	render () {
		const { place } = this.props;
		return (
			<li onClick={() => console.log(place.name)}>{place.name} | {place.pu_del}</li>
		)
	}
}