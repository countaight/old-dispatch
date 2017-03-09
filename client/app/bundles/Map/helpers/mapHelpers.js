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

	const size = {
		width: 640, // Map width in pixels
		height: 400, // Map height in pixels
	};

	return fitBounds(bounds, size);
}
