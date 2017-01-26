import mapReducer, { initialState as mapState } from './mapReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
	mapStore: mapReducer,
	railsContext: railsContextReducer
}

export const initialStates = {
	mapState,
	railsContextState
}