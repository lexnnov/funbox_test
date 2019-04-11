import React, { Component } from 'react';

class Map extends Component {
	constructor (props) {
		super(props)
		this.state = {
			polyLines: null
		}

		const { ymaps, centerMap, setCenter } = props;

		const init = () => {
			this.myMap = new ymaps.Map("map", {
				center: centerMap,
				zoom: 9,
				controls: []

			});
			this.myMap.events.add('boundschange', function (e) {
				setCenter(e.get('newCenter'))
			})
		};

		ymaps.ready(init);
	}

	componentDidUpdate(prevProps) {
		const {addRouteState, removeRouteState, renderPolylineState, endPolylineRender, removeRouteFromState } = this.props
		if(addRouteState === 'PROCESS'){
			this.addMarker();
		}
		if(removeRouteState === 'PROCESS'){
			this.removePlacemarkFromMap()
			removeRouteFromState()
		}
		if(renderPolylineState === 'PROCESS'){
			this.renderPolyLine()
			endPolylineRender()
		}
	}

	addMarker = () => {
		const { ymaps, routes, addPlacemarkToState, setRouteCoordinates } = this.props;
		routes.forEach((item, i) => {
			if (typeof item.placemark === 'undefined') {

				const placemark = new ymaps.Placemark(item.coords, {
					hintContent: item.data,
					balloonContent: item.data,
				}, {
					draggable: true,
				});

				this.myMap.geoObjects.add(placemark);
				addPlacemarkToState({id: i, placemark: placemark})

				placemark.events.add('dragend', () => {
					const newCoords = placemark.geometry.getCoordinates();
					setRouteCoordinates({ coords: newCoords,	id: item.id });
					this.renderPolyLine()
				});
			}
		});
	};

	removePlacemarkFromMap = () => {
		const {removeItemIndex, routes} = this.props
		let placemark = routes[removeItemIndex].placemark
		this.myMap.geoObjects.remove(placemark);
	};

	renderPolyLine = () => {
		const { ymaps, routes } = this.props;
		const coordsPoints = routes.map(item => item.coords);
		const polyline = new ymaps.Polyline(coordsPoints, {
			balloonContent: ""
		}, {
			balloonCloseButton: false,
			strokeColor: "#7f4028",
			strokeWidth: 5,
			strokeOpacity: 0.8
		});
		if (this.state.polyLines !== null) {
			this.myMap.geoObjects.remove(this.state.polyLines);
			this.setState({polyLines: null});
		}
		this.setState({polyLines: polyline});
		this.myMap.geoObjects.add(polyline);
	};

	render() {
		return(
			<div id="map" style={ { height: "400px", width: '100%' } }/>
		);
	}
}
export default Map;
