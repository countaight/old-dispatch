import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const K_SIZE = 20;

export default class MapMarker extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const style = this.props.$hover ? hoverStyle: greatPlaceStyle
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={"bubble"}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.props.$hover ? <div key={this.props.key} className={"bubble"}>{this.props.text}</div> : ""}
        </ReactCSSTransitionGroup>
        <div style={style} />
      </div>
    )
  }
}

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #669966',
  borderRadius: K_SIZE,
  backgroundColor: '#669966',
  textAlign: 'center',
  color: '#669966',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

const hoverStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  ...greatPlaceStyle,
  border: '5px solid #ddd',
  backgroundColor: '#ddd',
};

