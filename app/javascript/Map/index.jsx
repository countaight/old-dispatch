import React from 'react';
import ReactDOM from 'react-dom';
import MapApp from './startup/MapApp';

document.addEventListener('DOMContentLoaded', () => {
	const node = document.querySelector('.map-container');
	const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <MapApp {...data} />,
    node
  )
})