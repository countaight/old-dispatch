import ReactOnRails from 'react-on-rails';

import MapApp from './MapApp';

import mapStore from '../store/mapStore';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({ MapApp });

ReactOnRails.registerStore({
  mapStore
});