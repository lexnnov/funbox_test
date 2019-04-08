import React, { Component } from 'react';
import { GoogleMap, InfoWindow, Marker, Polyline, withGoogleMap } from 'react-google-maps';
import { generateItems } from './utils';


const mapStyles = {
	position: 'relative',
	width: '500px',
	height: '500px'
};

class Map extends Component {
	constructor (props) {
		super(props)
		this.state = {
			openInfoWindowMarkerId: null
		}
	}

	handleToggleOpen = (index) => {
		this.props.openInfo(index)

	}

	onMarkerDragEnd = (evt, id) => {
		const { latLng } = evt
		const lat = latLng.lat()
		const lng = latLng.lng()
		this.props.handler(lat, lng, id)
	};



	render() {
		const triangleCoords = this.props.routes.map((x)=> ({lat: x.coords[0], lng: x.coords[1]}));


		const GoogleMapExample = withGoogleMap(props => (
			<GoogleMap
				defaultOptions={{
					// these following 7 options turn certain controls off see link below
					streetViewControl: false,
					scaleControl: false,
					mapTypeControl: false,
					panControl: false,
					zoomControl: false,
					rotateControl: false,
					fullscreenControl: false
				}}
				defaultCenter = { { lat: 55.75, lng: 37.57 } }
				defaultZoom = { 5 }
			>
				{
					this.props.routes.map((marker, index)=>
					<Marker key={marker.id}  onClick={() => this.handleToggleOpen(index)} draggable={true} name={'Dolores park'}  position={{ lat: marker.coords[0], lng: marker.coords[1] }}
					        onDragEnd={(e) => this.onMarkerDragEnd(e, index)}

					>
						{marker.showInfo && (
							<InfoWindow>
								<h4>{marker.data}</h4>
							</InfoWindow>
						)}
					</Marker>
					)
				}
				<Polyline
					path={triangleCoords}
					strokeColor="#0000FF"
					strokeOpacity={0.8}
					strokeWeight={2} />
			</GoogleMap>
		));
		return(
			<div style={{ height: 350,
				width: '100%',
				display: 'flex',
				flexFlow: 'row nowrap',
				justifyContent: 'center',
				padding: 0 }}>
				<GoogleMapExample
					containerElement={ <div style={{
						width: "100%",
						marginLeft: 0
					}}
					/> }
					mapElement={ <div style={{ height: `100%`, width: '500px'  }} /> }
					handleToggleOpen={this.props.handleToggleOpen}


				/>
			</div>
		);
	}
};
export default Map;
