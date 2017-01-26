import * as actionTypes from '../constants/mapConstants';

export const initialState = {}

export default function mapReducer(state = initialState, action = null) {
	const { type } = action;

	switch (type) {
		case actionTypes.ADD_PLACE: {
			return state
		}

		case actionTypes.UPDATE_USER_POSITION: {
			const { user } = action
			const { users } = state
			const foundUser = users.filter((stateUser) => stateUser.user.id == user.id)[0];
			const editUser = foundUser.user
			const newUser = { ...editUser, coordinates: user.coordinates, updated_at: user.updated_at };
			foundUser.user = newUser
			
			const newState = { ...state, users }

			return newState
		}

		default: {
			return state
		}
	}
}