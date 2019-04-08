import React, { Component } from 'react';
import { GoogleMap, InfoWindow, Marker, Polyline, withGoogleMap } from 'react-google-maps';



class InfoWindowMap extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isOpen: false
		}
	}
	handleKeyPress = (e) => {

	}


	render() {
		return (
			<div>
				{this.state.isOpen && (<InfoWindow>
					{this.props.title}
				</InfoWindow>)}
			</div>
		);
	}
}

export default InfoWindowMap;
