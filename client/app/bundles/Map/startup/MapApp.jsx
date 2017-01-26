import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import MapContainer from '../containers/MapContainer';

export default (_props, _railsContext) => { // eslint-disable-line
  const store = ReactOnRails.getStore('mapStore');

  return (
    <Provider store={store}>
      <MapContainer />
    </Provider>
  );
};