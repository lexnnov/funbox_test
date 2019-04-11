import React, { Component } from 'react';
import './RouteRedactor.sass'


class RouteInput extends Component {
	constructor (props) {
		super(props);
		this.state = {
			inputValue: '',
		}
	}

	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.props.addRouteToState(this.state.inputValue)
			this.setState({inputValue: ''})
		}
	};

	render() {
		return  (
				<input
					value={this.state.inputValue}
					className="router-redactor__input"
					onKeyPress={this.handleKeyPress}
					onChange={e => this.setState({inputValue: e.target.value})}
					height="48"
					placeholder="Введите точку маршрута"
				/>
		);
	}
}

export default RouteInput;
