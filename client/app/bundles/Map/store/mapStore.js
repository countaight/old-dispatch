import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const initialUsers = props.users;
  const { mapState } = initialStates;
  const initialState = {
    mapStore: { ...mapState,
      users: initialUsers,
      currentUser: props.currentUser,
      initCenter: props.currentUser.coordinates,
      zoom: 9,
      selectedKey: '0',
    }
  ,
    railsContext,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware),
  );

  return composedStore(createStore)(reducer, initialState);
};