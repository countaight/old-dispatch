import * as actionTypes from '../constants/mapConstants';

export function addPlace(placeAssignment) {
	return (dispatch) => {
		dispatch({ type: actionTypes.ADD_PLACE });

		fetch(window.document.location.origin + '/admin/places', {
			method: 'POST',
			body: JSON.stringify(placeAssignment),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((resp) => resp.json())
		.then((assignment) => {
			return dispatch({
				type: actionTypes.ADD_PLACE_FULFILLED,
				assignment
			})
		})
		.catch((error) => {
			return dispatch({
				type: actionTypes.ADD_PLACE_REJECTED,
				error
			})
		});
	}
}

export function updatePlace(id) {
	return (dispatch) => {
		dispatch({ type: actionTypes.UPDATE_PLACE });

		fetch(window.document.location.origin + '/admin/place_assignments/' + id, {
			method: 'PATCH',
			body: JSON.stringify({id: id}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((resp) => resp.json())
		.then((assignment) => {
			return dispatch({
				type: actionTypes.UPDATE_PLACE_FULFILLED,
				assignment
			})
		})
		.catch((error) => {
			return dispatch({
				type: actionTypes.UPDATE_PLACE_REJECTED,
				error
			})
		});
	}
}

export function deletePlace(id) {
	return (dispatch) => {
		dispatch({ type: actionTypes.DELETE_PLACE });

		fetch(window.document.location.origin + '/admin/place_assignments/' + id, {
			method: 'DELETE',
			body: JSON.stringify({id: id}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((resp) => resp.json())
		.then((assignment) => {
			return dispatch({
				type: actionTypes.DELETE_PLACE_FULFILLED,
				assignment
			});
		})
		.catch((error) => {
			return dispatch({
				type: actionTypes.DELETE_PLACE_REJECTED,
				error
			})
		})
	}
}

export function updateUserPosition(user) {
	return {
		type: actionTypes.UPDATE_USER_POSITION,
		user
	}
}

export function selectKey(selectedKey) {
	return {
		type: actionTypes.SELECT_DRIVER,
		selectedKey
	}
}

export function setZoom(zoom) {
	return {
		type: actionTypes.SET_ZOOM,
		zoom
	}
}

export function setCenter(coords) {
	return {
		type: actionTypes.SET_CENTER,
		coords
	}
}