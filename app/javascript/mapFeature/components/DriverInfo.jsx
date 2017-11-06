import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const DriverInfo = ({user, lat, lng}) => {
	return (
		<div className="driver-info">
			<h3>{user.name}</h3>
			<p>Latitude: {lat}</p>
			<p>Longitude: {lng}</p>
			<p>Last Updated: {Moment(user.updated_at).calendar()}</p>
		</div>
	)
}

DriverInfo.propTypes = {
	user: PropTypes.object.isRequired,
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired
}

export default DriverInfo;