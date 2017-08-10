import { fitBounds } from 'google-map-react/utils';
import _ from 'lodash';

export function zoomTo(coordinates) {
	const sortLat = _.orderBy(coordinates, ['lat'], ['desc'])

	const sortLng = _.orderBy(coordinates, ['lng'], ['asc'])

	const bounds = {
		nw: {
			lat: _.first(sortLat).lat,
			lng: _.first(sortLng).lng
		},
		se: {
			lat: _.last(sortLat).lat,
			lng: _.last(sortLng).lng
		}
	};

	console.log(bounds);

	const size = {
		width: 640, // Map width in pixels
		height: 400, // Map height in pixels
	};

	return fitBounds(bounds, size);
}

export function distance(lat1, lon1, lat2, lon2, unit) {
	const radlat1 = Math.PI * lat1/180
	const radlat2 = Math.PI * lat2/180
	const theta = lon1-lon2
	const radtheta = Math.PI * theta/180
	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}
