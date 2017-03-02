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
			const foundUser = users.filter((stateUser) => stateUser.user.id == assignment.assignment.user_id)[0];
			const editUserPlaces = foundUser.places;
			const newUserPlaces = editUserPlaces.concat(assignment);
			foundUser.places = newUserPlaces;

			return newState
		}

		case actionTypes.UPDATE_USER_POSITION: {
			const { user } = action;
			const { users } = state;
			const foundUser = users.filter((stateUser) => stateUser.user.id == user.id)[0];
			const editUser = foundUser.user;
			const newUser = { ...editUser, coordinates: user.coordinates, updated_at: user.updated_at };
			foundUser.user = newUser;
			
			const newState = { ...state, users };

			return newState
		}

		default: {
			return state
		}
	}
}