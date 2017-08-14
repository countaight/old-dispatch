import React from 'react';
import ReactDOM from 'react-dom';
import MapApp from './startup/MapApp';

document.addEventListener('turbolinks:load', () => {
	const node = document.querySelector('.map-container');
	if (node) {
		const data = JSON.parse(node.getAttribute('data'))
		ReactDOM.render(
			<MapApp {...data} />,
			node
		)
	}
})