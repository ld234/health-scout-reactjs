/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: App Button
 * Created: 11 Jul 2018
 * Last modified: 16 Aug 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import { Button } from 'mdbreact';
export default class Btn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Button className="btn btn-block login button" color="primary" {...this.props}>
				{this.props.children}
			</Button>
		);
	}
}
