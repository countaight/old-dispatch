/*global google*/
import React, { PropTypes } from 'react';

export default class SearchInput extends React.Component {
	static propTypes = {
		userID: PropTypes.number,
	}

	onPlacesChanged = () => {
		const places = this.searchBox.getPlaces();
		const place = places[0].geometry.location.toJSON();

		const { name, place_id } = places[0];
		const { userID } = this.props;

		fetch('http://localhost:3000/admin/places', {
			method: 'POST',
			body: JSON.stringify({name, place_id, place, user_id: userID, pu_del: this.state.radioButton}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((resp) => resp.json())
		.then((respJSON) => console.log(respJSON));

		this.refs.input.value = "";
	}

	constructor (props) {
		super(props);
		this.state = {
			focused: false,
			radioButton: "PU"
		}
	}

	componentDidMount () {
		const input = this.refs.input;

		this.searchBox = new google.maps.places.SearchBox(input);
		this.searchBox.addListener('places_changed', this.onPlacesChanged);
	}

	componentWillUnmount () {
		this.searchBox.removeListener('places_changed', this.onPlacesChanged);
	}

	render () {
		const { userID } = this.props;
		return (
			<form ref="locForm" className={this.state.focused ? "form_focused" : "form_unfocused"} onFocus={() => this.setState({focused: true})} onBlur={() => this.setState({focused: false})} onSubmit={(e) => e.preventDefault()}>
				<input
					key={userID}
					placeholder="Add Pick-up or Delivery"
					ref="input"
					type="text"
				/>
				<div className="radio-button">
					<input
						value="PU"
						type="radio"
						checked={this.state.radioButton === "PU"}
						onChange={() => this.setState({radioButton: "PU"})}
					/><label>Pick-up</label>
				</div>
				<div className="radio-button">
					<input
						value="DEL"
						type="radio"
						checked={this.state.radioButton === "DEL"}
						onChange={() => this.setState({radioButton: "DEL"})}
					/><label>Delivery</label>
				</div>
			</form>
		)
	}
}