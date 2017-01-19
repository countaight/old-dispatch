import React, { PropTypes } from 'react';

import Place from './Place.jsx';

export default class PlaceList extends React.Component {
	static propTypes = {
		places: PropTypes.array.isRequired,
	}

	_renderPlaces () {
		const { places } = this.props;

		return (
			places.map((place) => {
				return (
					<Place key={Math.random()} place={place} />
				)
			})
		)
	}

	render () {
		return (
			<ul className="place-list">
				{this._renderPlaces()}
			</ul>
		)
	}
}