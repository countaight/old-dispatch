import mapReducer, { initialState as mapState } from './mapReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
	mapStore: mapReducer,
}

export const initialStates = {
	mapState,
}