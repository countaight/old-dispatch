import React from 'react';
import PropTypes from 'prop-types';

import DriverInfo from './DriverInfo.jsx';
import SearchInput from './SearchInput.jsx';
import PlaceList from './PlaceList.jsx';

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
		this.state = {
			open: false
		}
	}

	_handleClick (e) {
		if (e.target.nodeName !== 'DIV') {
			return;
		}

		if (!this.state.open) {
			this.props._handleSelected(this.props.user.id);
		}

		this.setState({open: this.props.selected === this.props.user.id});
	}

	_handleSelection (key) {
		this.props._handleSelected(key);
	}

	render () {
		const { user } = this.props;
		const { assignments } = this.props;
		let lat = user.coordinates.lat;
		let lng = user.coordinates.lng;
		let selected = this.props.selected == user.id;
		console.log(selected, user.name);

		return (
			<div
				key={user.id}
				className={selected ? "selected" : "not-selected"}
				onClick={this._handleClick.bind(this)}
			>
				<DriverInfo selected={selected} user={user} lat={lat} lng={lng} />
				{assignments && <PlaceList
					assignments={assignments}
					updatePlace={this.props.updatePlace}
					deletePlace={this.props.deletePlace}
					userLocation={user.coordinates}
					addPlace={this.props.addPlace}
					user={user}
				/>}
			</div>
		)
	}
}