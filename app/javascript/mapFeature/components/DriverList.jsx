import React from 'react';
import PropTypes from 'prop-types';

import Driver from './Driver.jsx';

export default class DriverList extends React.Component {
	static propTypes = {
		_setZoom: PropTypes.func.isRequired,
		_handleSelected: PropTypes.func.isRequired,
		_setCenter: PropTypes.func.isRequired,
		users: PropTypes.array.isRequired,
		_handleDeselect: PropTypes.func.isRequired,
		selected: PropTypes.string
	}

	_renderDrivers () {
		return (
			this.props.users.map((user) => {
				return (
					<Driver
						key={user.id}
						user={user}
						assignments={user.assignments}
						selected={this.props.selected}
						_handleSelected={this.props._handleSelected}
						_setZoom={this.props._setZoom}
						_setCenter={this.props._setCenter}
						_handleDeselect={this.props._handleDeselect}
						addPlace={this.props.addPlace}
						updatePlace={this.props.updatePlace}
						deletePlace={this.props.deletePlace}
					/>
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