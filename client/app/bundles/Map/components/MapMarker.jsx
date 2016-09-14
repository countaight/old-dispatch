import React, { PropTypes } from 'react';

const K_WIDTH = 80;
const K_HEIGHT = 40;


export default class MapMarker extends React.Component {
  render () {
    return (
      <div style={greatPlaceStyle}>
        {this.props.text}
      </div>
    )
  }
}

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #669966',
  backgroundColor: '#ddd',
  textAlign: 'center',
  color: '#669966',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};