import React from 'react';
import { Button } from 'mdbreact';
export default class Btn extends React.Component {
	constructor(props) {
		super(props);
	}
	//console.log(props);
	render() {
		// let buttonLabel = props["buttonLabel"];
		return (
			<Button className="btn btn-block login button" color="primary" {...this.props}>
				{this.props.children}
			</Button>
		);
	}
}

//<Button id={props.id} type={props.type} color="primary" className="btn btn-block login button" data-toggle={props.data-toggle} >{props.buttonLabel}</Button>
