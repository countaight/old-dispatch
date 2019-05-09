import React from 'react';
import PropTypes from 'prop-types';

import DriverInfo from './DriverInfo.jsx';
import SearchInput from './SearchInput.jsx';
import PlaceList from './PlaceList.jsx';
import DriverMenu from './DriverMenu.jsx'

export default class Driver extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		assignments: PropTypes.array.isRequired,
		_setZoom: PropTypes.func,
		_handleSelected: PropTypes.func,
		_handleDeselect: PropTypes.func,
		_setCenter: PropTypes.func,
		addPlace: PropTypes.func,
		selected: PropTypes.string,
		updatePlace: PropTypes.func,
		deletePlace: PropTypes.func,
	}

	constructor (props) {
		super(props);
	}

	_handleClick (e) {
		this.props._handleSelected(this.props.user.id);
	}

	_handleSelection (key) {
		this.props._handleSelected(key);
	}

	render () {
		const { user, assignments } = this.props;
		let { lat, lng } = user.coordinates
		let selected = this.props.selected == user.id;

		return (
			<div
				key={user.id}
				className={selected ? "selected" : "not-selected"}
				onClick={this._handleClick.bind(this)}
			>
				<DriverInfo selected={selected} user={user} lat={lat} lng={lng} />
				{selected && <DriverMenu {...this.props}/>}
			</div>
		)
	}
}