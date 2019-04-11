import React, { Component } from 'react';
import './RouteRedactor.sass'
import { Container, Draggable } from 'react-smooth-dnd';


class RouteList extends Component {


	removeItem = (index) =>{
		console.log(index)
		this.props.removeItem(index)
	}

	onDrop = (e) => {
		this.props.onDrop(e)
	}


	render() {
		return  (
			<div className="simple-page">
				<Container dragClass="active" onDrop={e => this.onDrop(e)}>
					{this.props.routes.map((p, index) => {
						return (
							<Draggable key={p.id}>
								<div className="draggable-item">
									<div className="title">
										{p.data}
									</div>
									<a onClick={()=> this.removeItem(index)}>x</a>

								</div>
							</Draggable>

						);

					})}
				</Container>
			</div>
		);
	}
}

export default RouteList;
