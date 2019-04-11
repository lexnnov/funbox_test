import React, { Component } from 'react';
import YandexMap from './RouteMap';
import './RouteRedactor.sass'
import RouteList from './RouteList';
import { generateId, applyDrag } from '../../scripts/helpers';
import RouteInput from './RouteInput';


class RouteRedactor extends Component {
	constructor (props) {
		super(props);
		this.state = {
			ADD_ROUT_STATE: 'AWAIT',
			REMOVE_ROUTE_STATE: 'AWAIT',
			RENDER_POLYLINE_STATE: 'AWAIT',
			routes: [],
			removeItemIndex: null,
			centerMap: [55.751574, 37.573856]
		}
	}

	addRouteToState = (value) => {
		this.setState({routes: [...this.state.routes, {id: generateId(this.state.routes), coords: this.state.centerMap, data: value}], ADD_ROUT_STATE: 'PROCESS' })
	};

	addPlacemarkToState = (placemark) => {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.routes.forEach((item)=>{
			if(item.id === placemark.id) {
				stateCopy.routes[item.id].placemark= placemark.placemark;
			}
		})
		this.setState(stateCopy);
		this.setState({ADD_ROUT_STATE: 'AWAIT', RENDER_POLYLINE_STATE: 'PROCESS'})
	};

	removeItem = (index) => {
		this.setState({
			REMOVE_ROUTE_STATE: 'PROCESS',
			removeItemIndex: index
		});
	};

	removeRouteFromState = () => {
		this.setState({
			routes: this.state.routes.filter((_, i) => i !== this.state.removeItemIndex),
			REMOVE_ROUTE_STATE: 'AWAIT',
			RENDER_POLYLINE_STATE: 'PROCESS'
		});
	};

	endPolylineRender = () => {
		this.setState({
			RENDER_POLYLINE_STATE: 'AWAIT'
		});
	};

	setRouteCoordinates = (marker) => {
		let stateCopy = Object.assign({}, this.state);
		stateCopy.routes.forEach((item, index)=>{
			if(item.id === marker.id) {
				stateCopy.routes[index].coords= marker.coords;
			}
		});
		this.setState(stateCopy);
	};

	setCenter = (newCenter) => {
		this.setState({centerMap: newCenter})
	};

	reorderRoutes = (e) =>{
		this.setState({ routes: applyDrag(this.state.routes, e), RENDER_POLYLINE_STATE: 'PROCESS'})
	};

	render() {
		const {ymaps} = window;
		const props = {
			ymaps: ymaps,
			centerMap: this.state.centerMap,
			removeItemIndex: this.state.removeItemIndex,
			removeRouteState: this.state.REMOVE_ROUTE_STATE,
			addRouteState: this.state.ADD_ROUT_STATE,
			routes: this.state.routes,
			renderPolylineState: this.state.RENDER_POLYLINE_STATE,
			setRouteCoordinates: this.setRouteCoordinates,
			addPlacemarkToState: this.addPlacemarkToState,
			removeRouteFromState: this.removeRouteFromState,
			endPolylineRender: this.endPolylineRender,
			setCenter: this.setCenter
		};

		return (
			<div className='router-redactor'>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-3">
							<RouteInput addRouteToState={this.addRouteToState}/>
							<RouteList routes={this.state.routes}	removeItem = {this.removeItem} onDrop = {e => this.reorderRoutes(e) }
							/>
						</div>
						<div className="col-6">
							<YandexMap { ...props }	/>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default RouteRedactor;
