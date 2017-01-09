import React from 'react';

export default class SearchInput extends React.Component {
	onPlacesChanged = () => {
		const places = this.searchBox.getPlaces();
		const place = places[0].geometry.location.toJSON();

		const { name, place_id } = places[0];

		fetch('http://localhost:3000/admin/places', {
			method: 'POST',
			body: JSON.stringify({name, place_id, place, user_id: this.props.userID}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then((resp) => resp.json())
		.then((respJSON) => console.log(respJSON));

		this.refs.input.value = "";
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
	 	return <input key={this.props.userID} placeholder="Enter P/U or Delivery" ref="input" type="text"/>
	 }
}