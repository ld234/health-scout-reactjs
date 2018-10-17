/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: InputGroup for short forms
 * Created: 13 Jul 2018
 * Last modified: 15 Jul 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';

export default class InputGroup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="input-group">
				<input {...this.props} />
			</div>
		);
	}
}
