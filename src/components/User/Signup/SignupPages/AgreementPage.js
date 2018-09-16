import React, { Component } from 'react';
import Aux from '../../../../hoc/ReactAux';
class AgreementPage extends Component {
	constructor(props) {
		super(props);
		this.props.setAgreement(true);
	}

	render() {
		return (
			<Aux>
				<input type="checkbox" name="agreement" onChange={this.props.toggle} />
			</Aux>
		);
	}
}

export default AgreementPage;
