import mapReducer, { initialState as mapState } from './mapReducer';

export default {
	mapStore: mapReducer,
}

export const initialStates = {
	mapState,
}