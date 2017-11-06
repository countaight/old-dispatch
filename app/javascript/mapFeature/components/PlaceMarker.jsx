import React from 'react';
import PropTypes from 'prop-types';

export default class PlaceMarker extends React.Component {
  static propTypes = {
    $hover: PropTypes.bool,
    id: PropTypes.string.isRequired,
    selectedKey: PropTypes.string,
    title: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string,
    motionStyle: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      left: PropTypes.number,
      top: PropTypes.number
    }),
    puDel: PropTypes.string,
  }

  render () {
    const { width, height, left, top } = this.props.motionStyle;
    const hoverStyle = this.props.puDel === "DEL" ? hoverDelStyle : hoverPuStyle;

    const greatPlaceStyle = this.props.puDel === "DEL" ? greatDelPlaceStyle : greatPuPlaceStyle

    const style = this.props.$hover ? {...hoverStyle, width, height, left, top} : {...greatPlaceStyle, width, height, left, top}

    return (
      <div>
        <div style={style}>
          <div style={this.props.puDel=== "DEL" ? {...innerDelStyle, width: width-8, height: height-8} : {...innerPuStyle, width: width-8, height: height-8}} />
        </div>
      </div>
    )
  }
}

const innerDelStyle = {
  position: 'relative',
  left: 4,
  top: 4,
  borderRadius: "50%",
  backgroundColor: '#e59400'
};

const innerPuStyle = {
  ...innerDelStyle,
  backgroundColor: '#006858'
};

const greatDelPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',

  border: "2px solid #e59400",
  borderRadius: 18,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#e59400',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 'bold',
};

const greatPuPlaceStyle = {
  ...greatDelPlaceStyle,
  color: '#006858',
  border: '2px solid #006858',
}

const hoverDelStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  ...greatDelPlaceStyle,
  border: '2px solid #ddd',
  backgroundColor: '#e59400',
  zIndex: 1000,
};

const hoverPuStyle = {
  ...greatPuPlaceStyle,
  border: '2px solid #ddd',
  backgroundColor: '#006858',
  zIndex: 1000,
};

