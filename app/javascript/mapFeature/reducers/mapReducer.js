import * as actionTypes from '../constants/mapConstants';

export const initialState = {}

export default function mapReducer(state = initialState, action = null) {
	const { type } = action;

	switch (type) {
		case actionTypes.ADD_PLACE: {
			return state
		}

		case actionTypes.ADD_PLACE_FULFILLED: {
			const { assignment } = action;
			const newState = Object.assign({}, state);
			const { users } = newState;
			const foundUser = users.filter((stateUser) => stateUser.id == assignment.user.id)[0];
			const editUserAssignments = foundUser.assignments;
			const newUserAssignments = editUserAssignments.concat(assignment);
			foundUser.assignments = newUserAssignments;

			return newState
		}

		case actionTypes.UPDATE_USER_POSITION: {
			const { user } = action;
			const { users } = state;
			let foundUser = users.filter((stateUser) => stateUser.id == user.id)[0];
			const editUser = foundUser;
			const newUser = { ...editUser, coordinates: user.coordinates, updated_at: user.updated_at };
			foundUser = newUser;

			const newState = { ...state, users };

			return newState
		}

		case actionTypes.UPDATE_PLACE_FULFILLED: {
			const { assignment } = action;
			const newState = Object.assign({}, state);
			const { users } = newState;
			const foundUser = users.filter((stateUser) => stateUser.id == assignment.user.id)[0];
			const foundAssignment = foundUser.assignments.filter((stateAssg) => stateAssg.id == assignment.id);
			const indexAssignment = foundUser.assignments.indexOf(foundAssignment[0])
			foundUser.assignments[indexAssignment] = assignment

			return newState;
		}

		case actionTypes.DELETE_PLACE_FULFILLED: {
			const { assignment } = action;
			const newState = Object.assign({}, state);
			const { users } = newState;
			const foundUser = users.filter((stateUser) => stateUser.id == assignment.user.id)[0];
			const userAssignments = foundUser.assignments.filter((stateAssg) => stateAssg.id != assignment.id);
			foundUser.assignments = userAssignments;

			return newState;
		}

		case actionTypes.SELECT_DRIVER: {
			const { selectedKey } = action;
			const newState = { ...state, selectedKey }

			return newState
		}

		case actionTypes.SET_ZOOM: {
			const { zoom } = action;
			const newState = { ...state, zoom }

			return newState
		}

		case actionTypes.SET_CENTER: {
			const { coords } = action;
			const newState = { ...state, initCenter: coords }

			return newState
		}

		default: {
			return state
		}
	}
}