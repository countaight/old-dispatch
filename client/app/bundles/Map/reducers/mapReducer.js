import * as actionTypes from '../constants/mapConstants';

export const initialState = {}

export default function mapReducer(state = initialState, action = null) {
	const { type } = action;

	switch (type) {
		case actionTypes.ADD_PLACE: {
			return state
		}

		default: {
			return state
		}
	}
}