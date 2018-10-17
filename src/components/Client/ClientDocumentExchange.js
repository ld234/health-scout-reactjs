/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Component displaying the documents received by the practitioners
 * Created: 13 Aug 2018
 * Last modified: 17 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import { Button, Modal, ModalHeader } from 'mdbreact';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getNewRecievedDocuments,
	getOldRecievedDocuments,
	setSeenExchangeDocument,
	downloadExchangeDocument,
	setCurrentIndex,
	downloadToComputer,
} from '../../actions/documentExchange.actions';
import '../../../style/ClientDocumentExchange.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SendDocument from './ClientDocumentSend';
import ViewPDF from '../Recyclable/LoadPdf';
import axios from 'axios';
class ClientDocumentExchange extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sendDocumentToggle: false,
			viewDocumentToggle: false,
			selectedDoc: null,
		};
	}

	// Triggers document download
	download(title, idx, cb) {
		let data = { title, patientUsername: this.props.clientState.currentClient.patientUsername };
		this.props.downloadExchangeDocument(data, idx, cb);
	}

	componentDidMount() {
		let { patientUsername } = this.props.clientState.currentClient;
		this.props.getNewRecievedDocuments(patientUsername);
		this.props.getOldRecievedDocuments(patientUsername);
	}

	toggleSendDocument = () => {
		this.setState({
			sendDocumentToggle: !this.state.sendDocumentToggle,
		});
	};

	toggleViewDocument = (filepath, idx) => {
		if (Number.isInteger(idx)) this.props.setCurrentIndex(idx);
		this.setState((prevState, props) => {
			return {
				viewDocumentToggle: !prevState.viewDocumentToggle,
				selectedDoc: filepath,
			};
		});
	};

	// Displays the view document modal once the data is downloaded, set the status to seen
	onReadDoc = (title, filepath, patientUsername) => {
		let data = { patientUsername, title };
		this.props.setSeenExchangeDocument(data);
		this.toggleViewDocument();
	};

	render() {
		const { fName, lName, patientUsername } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Document exchange'];
		const tos = [`/client`, '/client/document-exchange'];
		let recievedList, seenDocList;
		let indexLength = 0;

		// Unseen docs displayed on top
		if (this.props.documentExchangeState.unseenDocuments) {
			indexLength = this.props.documentExchangeState.unseenDocuments.length;
			recievedList = this.props.documentExchangeState.unseenDocuments.map((doc, idx) => {
				return (
					<li key={idx} className="docEx-item docEx-notseen">
						<div
							className="docEx-detail"
							onClick={() => {
								this.download(doc.title, idx);
								setTimeout(
									() =>
										this.download(doc.title, idx, () => this.onReadDoc(doc.title, doc.receivedLink, patientUsername)),
									100
								);
							}}
						>
							<span className="docEx-modification">{doc.title}</span>
							<span className=" docEx-desc">{doc.description}</span>
						</div>
						<div
							className="docEx-modify"
							onClick={() => {
								const data = { title: doc.title, patientUsername: doc.patientUsername };
								this.download(doc.title, idx);
								setTimeout(() => this.props.downloadToComputer(data, idx), 1000);
								this.props.setSeenExchangeDocument(data);
							}}
						>
							<span>
								<i className="fas fa-download" />
							</span>
						</div>
					</li>
				);
			});
		}
		if (this.props.documentExchangeState.seenDocuments) {
			seenDocList = this.props.documentExchangeState.seenDocuments.map((doc, idx) => {
				return (
					<li key={idx + indexLength} className="docEx-item">
						<div
							className="docEx-detail"
							onClick={() => {
								this.props.setCurrentIndex(idx);
								this.download(doc.title, idx);
								setTimeout(() => this.download(doc.title, idx, () => this.toggleViewDocument()), 100);
							}}
						>
							<span className="docEx-modification">{doc.title}</span>
							<span className=" docEx-desc">{doc.description}</span>
						</div>
						<div
							className="docEx-modify"
							onClick={() => {
								const data = { title: doc.title, patientUsername: doc.patientUsername };
								this.download(doc.title, idx);
								setTimeout(() => this.props.downloadToComputer(data, idx), 1000);
							}}
						>
							<span>
								<i className="fas fa-download" />
							</span>
						</div>
					</li>
				);
			});
		}
		if (seenDocList && recievedList) {
			recievedList = recievedList.concat(seenDocList);
		} else if (seenDocList) {
			recievedList = seenDocList;
		}

		return (
			<div className="allergy-history right">
				<ClientGeneralInfo />
				<div className="main-wrapper">
					<div className="breadcrumbs animated fadeIn">
						{breadcrumbs.map((crumb, idx) => {
							if (idx === breadcrumbs.length - 1)
								return (
									<span key={'crumb' + idx}>
										{' '}
										&gt; <span>{crumb}</span>
									</span>
								);
							else if (idx !== 0)
								return (
									<span key={'crumb' + idx}>
										{' '}
										&gt; <Link to={tos[idx]}>{crumb}</Link>
									</span>
								);
							else
								return (
									<span key={'crumb' + idx}>
										{' '}
										<Link to={tos[idx]}>{crumb}</Link>
									</span>
								);
						})}
					</div>
					<div>
						<div className="practitioner-profile-head row justify-content-between">
							<div className="col col-md-8 profile-title">
								<h4>Received Documents</h4>
							</div>
							<div className="col col-md-4 profile-button">
								<Button id="button" color="primary" className="button add-button" onClick={this.toggleSendDocument}>
									Send documents
								</Button>
							</div>
							<div className="horizontal-line">
								<hr />
							</div>
							<div className="col col-md-12 myDocuments">
								<div className="mydocs-wrapper">
									<ul className="rolldown-list" id="myList">
										<ReactCSSTransitionGroup
											transitionName="specialtyFade"
											transitionEnterTimeout={500}
											transitionLeaveTimeout={500}
										/>
										{recievedList}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Modal for sending docs */}
				<Modal
					className="addition-modal"
					isOpen={this.state.sendDocumentToggle}
					toggle={this.toggleSendDocument}
					centered
				>
					<ModalHeader toggle={this.toggleSendDocument}>Send Documents</ModalHeader>
					<SendDocument toggle={this.toggleSendDocument} />
				</Modal>
				{/* Modal for viewing pdf */}
				<Modal
					className="viewPdfModal"
					isOpen={this.state.viewDocumentToggle}
					toggle={this.toggleViewDocument}
					centered
				>
					<ModalHeader toggle={this.toggleViewDocument}>View Documents</ModalHeader>
					<ViewPDF
						data={
							this.props.documentExchangeState.pdfUint8Array
								? this.props.documentExchangeState.pdfUint8Array[this.props.documentExchangeState.selectedIndex | 0]
								: []
						}
					/>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		clientState: state.clients,
		documentExchangeState: state.documentExchange,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setSeenExchangeDocument: data => dispatch(setSeenExchangeDocument(data)),
		getNewRecievedDocuments: patientUsername => dispatch(getNewRecievedDocuments(patientUsername)),
		getOldRecievedDocuments: patientUsername => dispatch(getOldRecievedDocuments(patientUsername)),
		downloadExchangeDocument: (data, idx, cb) => dispatch(downloadExchangeDocument(data, idx, cb)),
		setCurrentIndex: idx => dispatch(setCurrentIndex(idx)),
		downloadToComputer: (data, idx) => dispatch(downloadToComputer(data, idx)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientDocumentExchange);
