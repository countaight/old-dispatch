import React from 'react';
import PropTypes from 'prop-types';
import { Motion, presets, spring } from 'react-motion';
import Moment from 'moment';

const K_SIZE = 18;

export default class MapMarker extends React.Component {
  static propTypes = {
    $hover: PropTypes.bool,
    id: PropTypes.string.isRequired,
    selectedKey: PropTypes.string,
    title: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
  }

  render () {
    const style = this.props.$hover ? hoverStyle : greatPlaceStyle;

    return (
      <div>
        <Motion
          defaultStyle={{ width: 0, height: 0, top: 0 }}
          style={{
            width: spring(this.props.$hover || this.props.id == this.props.selectedKey ? 150 : 0, presets.wobbly),
            height: spring(this.props.$hover || this.props.id == this.props.selectedKey ? 70 : 0, presets.wobbly),
            top: spring(this.props.$hover || this.props.id == this.props.selectedKey ? -65 : 0, presets.wobbly)
          }}
        >
          {value => {
            return <div className={'bubble'} style={{width: value.width, height: value.height}}>
              <h1 className={"bubble-title"}>{this.props.title}</h1>
              <p className={"bubble-text"}>Last Updated: {Moment(this.props.lastUpdated).calendar()}</p>
            </div>
            }
          }
        </Motion>
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
  backgroundColor: '#669966'
}

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: "2px solid #669966",
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#669966',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 'bold',
};

const hoverStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  ...greatPlaceStyle,
  border: '2px solid #ddd',
  backgroundColor: '#669966',
  zIndex: 1000,
};

