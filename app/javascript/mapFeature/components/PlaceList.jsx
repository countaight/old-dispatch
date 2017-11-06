import React from 'react';
import PropTypes from 'prop-types';

import Place from './Place.jsx';

export default class PlaceList extends React.Component {
	static propTypes = {
		assignments: PropTypes.array.isRequired,
		updatePlace: PropTypes.func.isRequired,
		deletePlace: PropTypes.func.isRequired,
		userLocation: PropTypes.object.isRequired,
	}

	_renderPlaces () {
		const { assignments } = this.props;

		return (
			assignments.map((assignment) => {
				return (
					<Place
						key={Math.random()}
						assignment={assignment}
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