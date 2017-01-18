import React, { PropTypes } from 'react';
import Moment from 'moment';

import DriverInfo from './DriverInfo.jsx';
import SearchInput from './SearchInput.jsx';

export default class Driver extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		places: PropTypes.array.isRequired,
		_setZoom: PropTypes.func,
		_handleSelected: PropTypes.func,
		_setCenter: PropTypes.func
	}

	constructor (props) {
		super(props);
		this.state = {
			keepOpen: false
		}
	}

	_handleClick () {
		this.props._setZoom(12);
		this.setState({keepOpen: !this.state.keepOpen});
	}

	_handleSelection (key, coords) {
		this.props._handleSelected(key);
		this.props._setCenter(coords);
	}

	render () {
		const { user } = this.props;
		const { places } = this.props;
		let lat = user.coordinates.lat;
		let lng = user.coordinates.lng;
		let selected = this.props.selected == user.id

		return (
			<div
				key={user.id}
				className={selected || this.state.keepOpen ? "selected" : "not-selected"}
				onClick={this._handleClick.bind(this)}
				onMouseEnter={this._handleSelection.bind(this, `${user.id}`, [lat, lng])}
				onMouseLeave={this.props._handleDeselect.bind(this)}
			>
				<DriverInfo user={user} lat={lat} lng={lng} />
				<SearchInput userID={user.id}/>
				<ul>
					{places.map((place) => {
						return <li onClick={() => console.log(place.name)} key={Math.random()}>{place.name}</li>
					})}
				</ul>
			</div>
		)
	}
}