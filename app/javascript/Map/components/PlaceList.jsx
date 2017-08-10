import React, { PropTypes } from 'react';

import Place from './Place.jsx';

export default class PlaceList extends React.Component {
	static propTypes = {
		places: PropTypes.array.isRequired,
		updatePlace: PropTypes.func.isRequired,
		deletePlace: PropTypes.func.isRequired,
	}

	_renderPlaces () {
		const { places } = this.props;

		return (
			places.map((place) => {
				return (
					<Place
						key={Math.random()}
						place={place}
						updatePlace={this.props.updatePlace}
						deletePlace={this.props.deletePlace}
						userLocation={this.props.userLocation}
					/>
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