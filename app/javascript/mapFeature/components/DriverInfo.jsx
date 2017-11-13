import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const DriverInfo = ({user, lat, lng, selected}) => {
	return (
		<div className="driver-info">
			<h3>{user.name}</h3>
		</div>
	)
}

DriverInfo.propTypes = {
	user: PropTypes.object.isRequired,
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired
}

export default DriverInfo;