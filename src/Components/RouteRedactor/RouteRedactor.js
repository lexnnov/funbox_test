import React, { Component } from 'react';
import YandexMap from './YandexMap';
import './RouteRedactor.sass'
import { applyDrag} from './utils';
import DragContainer from './dragContainer';


class RouteRedactor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			routes: [
				{id: 0, coords: [55.75, 37.57], data: 'Draggable' + 1, showInfo: false},
				{id: 1, coords: [54.75, 39.57], data: 'Draggable' + 3, showInfo: false},
				{id: 2, coords: [56.75, 39.57], data: 'Draggable' + 2, showInfo: false}
				]
		}
	}
	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.setState({routes: [...this.state.routes, {id: this.generateId(), coords: [55.75, 37.57], data: 'Draggable'}] })
		}
	}

	generateId = () =>  {
		let index = 0

		for (let a = 0;  a < this.state.routes.length; a++){
			if(index === this.state.routes[index].id){
				index ++
			}else {
				break
			}
		}
		console.log(index)
		return index
	}

	removeItem = (index) =>{
		console.log(index)
		this.setState({
			routes: this.state.routes.filter((_, i) => i !== index)
		});
	}

	handler = (lat, lng, id) => {
		console.log(lat, lng, id)
		var stateCopy = Object.assign({}, this.state);
		stateCopy.routes[id].coords[0] = lat;
		stateCopy.routes[id].coords[1] = lng;
		this.setState(stateCopy);
	}

	openInfo = (index) => {
		var stateCopy = Object.assign({}, this.state);
		stateCopy.routes[index].showInfo = !stateCopy.routes[index].showInfo;
		this.setState(stateCopy);
	}

	render() {
		return (
			<div className="route-redactor">
				<div className="route-redactor__routes">
					<input className="route-redactor__routes__input" onKeyPress={this.handleKeyPress} height="48" placeholder="Ведите название маршрута" />
					<DragContainer routes={this.state.routes} removeItem = {this.removeItem} onDrop = {e => this.setState({ routes: applyDrag(this.state.routes, e)})} />
				</div>
				<YandexMap routes={this.state.routes} handler = {this.handler} openInfo = {this.openInfo}/>
			</div>

		);
	}
}

export default RouteRedactor;
