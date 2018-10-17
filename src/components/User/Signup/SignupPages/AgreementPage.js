/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Page showing the agreement/terms & conditions when using the website
 * Created: 17 Jul 2018
 * Last modified: 17 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import Aux from '../../../../hoc/ReactAux';
class AgreementPage extends Component {
	constructor(props) {
		super(props);
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
