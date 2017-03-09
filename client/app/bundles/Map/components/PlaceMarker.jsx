import React, { PropTypes } from 'react';

const K_SIZE = 18;

export default class PlaceMarker extends React.Component {
  static propTypes = {
    $hover: PropTypes.bool,
    id: PropTypes.number.isRequired,
    selectedKey: PropTypes.string,
    title: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string
  }

  constructor (props) {
    super(props);
  }

  render () {
    const style = this.props.$hover ? hoverStyle : greatPlaceStyle
    return (
      <div>
        <div style={style}>
          <div style={innerStyle} />
        </div>
      </div>
    )
  }
}

const innerStyle = {
  position: 'relative',
  width: 10,
  height: 10,
  left: 4,
  top: 4,
  borderRadius: "50%",
  backgroundColor: '#e59400'
}

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: "2px solid #e59400",
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#e59400',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 'bold',
};

const hoverStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  ...greatPlaceStyle,
  border: '2px solid #ddd',
  backgroundColor: '#e59400',
  zIndex: 1000,
};

