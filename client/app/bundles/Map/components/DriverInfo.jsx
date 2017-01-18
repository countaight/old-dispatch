import React, { PropTypes } from 'react';
import Moment from 'moment';

const DriverInfo = ({user, lat, lng}) => {
	return (
		<div className="driver-info">
			<h1>{user.name}</h1>
			<p>User ID: {user.id}</p>
			<p>Latitude: {lat} Longitude: {lng}</p>
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