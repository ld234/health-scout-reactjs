/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Modal displaying documents not sent and allowing practitioner to
 * send them to the current client
 * Created: 13 Aug 2018
 * Last modified: 2 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button } from 'mdbreact';
import { getDocuments } from '../../actions/documentExchange.actions';
import { connect } from 'react-redux';
import { sendDocuments } from '../../actions/documentExchange.actions';

class ClientDocumentSend extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sendList: [],
			error: null,
		};
	}

	componentDidMount() {
		let { patientUsername } = this.props.clientState.currentClient;
		this.props.getDocuments(patientUsername);
	}

	validateForm = e => {
		e.preventDefault();
		let { patientUsername } = this.props.clientState.currentClient;

		if (this.state.sendList.length == 0) {
			this.setState({ error: 'Please select a document to send' });
		} else {
			let sendDocuments = this.state.sendList.map(title => {
				return { patientUsername, title };
			});
			this.props.sendDocuments(sendDocuments, () => this.props.toggle());
		}
	};

	toggleSendSelect(title) {
		this.setState({ error: null });
		let found = this.state.sendList.find(function(docTitle) {
			return docTitle == title;
		});
		if (found == title) {
			let newList = this.state.sendList.filter(function(docTitle) {
				return docTitle != title;
			});
			this.setState({ sendList: newList });
		} else {
			this.setState({ sendList: [...this.state.sendList, title] });
		}
	}
	renderError = () => {
		let { isGetExchangeDocumentsError } = this.props.exchangeDocumentsState;
		if (isGetExchangeDocumentsError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{addDocumentError.data.message}
				</div>
			);
		else if (this.state.error)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{this.state.error}
				</div>
			);
		return null;
	};

	render() {
		let docUnsendlist;
		let docSendlist;
		let docList;
		if (this.props.exchangeDocumentsState.exchangeDocuments) {
			docUnsendlist = this.props.exchangeDocumentsState.exchangeDocuments.filter(doc => {
				return doc.status == 'Delivered';
			});
			docSendlist = this.props.exchangeDocumentsState.exchangeDocuments.filter(doc => {
				return doc.status != 'Delivered';
			});
			docList = docSendlist.map((doc, idx) => {
				return (
					<div class="DocExCheckBox">
						<input id={idx} name={idx} type="checkbox" onClick={() => this.toggleSendSelect(doc.title)} />
						<label for={idx}>{doc.title}</label>
					</div>
				);
			});
			let docListAppend = docUnsendlist.map((doc, idx) => {
				return (
					<div class="DocExCheckBox-Disabled">
						<input id={docSendlist.length + idx} name={docSendlist.length + idx} type="checkbox" disabled />
						<label for={docSendlist.length + idx}>{doc.title}</label>
					</div>
				);
			});
			docList = docList.concat(docListAppend);
		}

		return (
			<form onSubmit={this.validateForm}>
				<ModalBody>
					{this.renderError()}
					<div className="sendDocContainer">{docList}</div>
				</ModalBody>
				<ModalFooter>
					<Button className="button" color="primary" type="submit">
						Send <i className="fas fa-paper-plane" />
					</Button>
				</ModalFooter>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		clientState: state.clients,
		exchangeDocumentsState: state.documentExchange,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		sendDocuments: (sendDocumentList, successCb) => dispatch(sendDocuments(sendDocumentList, successCb)),
		getDocuments: patientUsername => dispatch(getDocuments(patientUsername)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientDocumentSend);
