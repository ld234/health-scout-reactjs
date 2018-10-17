/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Page containing list of uploaded baseline documents
 * Created: 20 Aug 2018
 * Last modified: 22 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import UserGeneralInfo from '../User/UserGeneralInfo';
import MyDocuments from './PractitionerMyDocuments';
import PractitionerAddDocument from './PractitionerAddDocumentForm';
import PractitionerEditDocument from './PractitionerEditDocumentForm';

class PractitionerMyDocumentPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="practitioner-page" className="right">
				<UserGeneralInfo />
				<div className="main-wrapper">
					<MyDocuments addComponent={PractitionerAddDocument} editComponent={PractitionerEditDocument} />
				</div>
			</div>
		);
	}
}

export default PractitionerMyDocumentPage;
