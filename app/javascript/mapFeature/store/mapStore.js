import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

export default (p) => {
  const initialState = {
    mapStore: {
      users: p.users,
      currentUser: p.currentUser,
      initCenter: p.currentUser.coordinates,
      zoom: 9,
      selectedKey: '0',
    }
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware),
  );

  return composedStore(createStore)(reducer, initialState);
};