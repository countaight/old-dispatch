import React from 'react';
import ReactOnRails from 'react-on-rails';

import Map from '../components/Map';

const MapApp = (props) => (
  <Map {...props} />
);

// This is how react_on_rails can see the MapApp in the browser.
ReactOnRails.register({ MapApp });