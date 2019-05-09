import React, { Component } from 'react';

export default class DriverMenu extends Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false
		}
	}

	render () {
		console.log(this.props);
		return (
			<div className="driver-options">
				<div className="driver-option">
					⊕
				</div>
				<div className="driver-option">
					⦿
				</div>
				<div className="driver-option">
					💬
				</div>
			</div>
		)
	}
}