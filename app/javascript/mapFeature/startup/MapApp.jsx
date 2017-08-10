import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/mapStore';

import MapContainer from '../containers/MapContainer';

export default (props) => { // eslint-disable-line
	console.log(process.env);
  return (
    <Provider store={store(props)}>
      <MapContainer />
    </Provider>
  );
};