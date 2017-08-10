import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Map from '../components/Map';
import * as mapActionCreators from '../actions/mapActions';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.mapStore };
}

class MapContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(mapActionCreators, dispatch);
    return (
      <Map {...{ actions, data }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(MapContainer);