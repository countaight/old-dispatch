import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/mapStore';

import MapContainer from '../containers/MapContainer';

export default (props) => { // eslint-disable-line
  return (
    <Provider store={store(props)}>
      <MapContainer />
    </Provider>
  );
};