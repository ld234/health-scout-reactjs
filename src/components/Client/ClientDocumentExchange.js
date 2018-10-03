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
	download(title) {
		let data = { title, patientUsername: this.props.clientState.currentClient.patientUsername };
		this.props.downloadExchangeDocument(data);
	}

	componentDidMount() {
		console.log('[DocumentExchange.js] component did mount');
		let { patientUsername } = this.props.clientState.currentClient;
		this.props.getNewRecievedDocuments(patientUsername);
		this.props.getOldRecievedDocuments(patientUsername);
	}

	toggleSendDocument = () => {
		this.setState({
			sendDocumentToggle: !this.state.sendDocumentToggle,
		});
	};
	toggleViewDocument = filepath => {
		console.log('toggle view doc:', filepath);
		this.setState((prevState, props) => {
			return {
				viewDocumentToggle: !prevState.viewDocumentToggle,
				selectedDoc: filepath,
			};
		});
	};

	onReadDoc = (title, filepath, patientUsername) => {
		// console.log(this.state.newRecieved);
		// let doc = this.state.newRecieved.find((doc)=>{
		//     return doc.title == title;
		// })
		// let newRecieved = this.state.newRecieved.filter((doc) =>{
		//     console.log(doc.title);
		//     return doc.title !== title;
		// })
		// let oldRecieved = this.state.oldRecieved;
		// oldRecieved.unshift(doc);
		// this.setState({newRecieved});
		// this.setState({oldRecieved});
		// let data ={patientUsername,title};
		// this.toggleViewDocument(filepath);
		// this.props.setSeenExchangeDocument(data);
	};

	render() {
		const { fName, lName, patientUsername } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Document exchange'];
		const tos = [`/client`, '/client/document-exchange'];
		let recievedList, seenDocList;
		let indexLength = 0;
		if (this.props.documentExchangeState.unseenDocuments) {
			indexLength = this.props.documentExchangeState.unseenDocuments.length;
			recievedList = this.props.documentExchangeState.unseenDocuments.map((doc, idx) => {
				return (
					<li key={idx} className="docEx-item docEx-notseen">
						<div
							className="docEx-detail"
							onClick={() => {
								this.onReadDoc(doc.title, doc.receivedLink, patientUsername);
							}}
						>
							<span className="docEx-modification">{doc.title}</span>
							<span className=" docEx-desc">{doc.description}</span>
						</div>
						<div
							className="docEx-modify"
							onClick={() => {
								this.download(doc.title);
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
								this.toggleViewDocument(doc.receivedLink);
							}}
						>
							<span className="docEx-modification">{doc.title}</span>
							<span className=" docEx-desc">{doc.description}</span>
						</div>
						<div
							className="docEx-modify"
							onClick={() => {
								this.download(doc.title);
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
									<div className="row">
										<div className="col col-xs-1" />
										<div className="col col-xs-3">NAME</div>
										<div className="col col-xs-5">DESCRIPTION</div>
										<div className="col col-xs-2"> LAST MODIFIED</div>
										<div className="col col-xs-1" />
									</div>
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
				<Modal
					className="addition-modal"
					isOpen={this.state.sendDocumentToggle}
					toggle={this.toggleSendDocument}
					centered
				>
					<ModalHeader toggle={this.toggleSendDocument}>Send Documents</ModalHeader>
					<SendDocument toggle={this.toggleSendDocument} />
				</Modal>
				<Modal
					className="viewPdfModal"
					isOpen={this.state.viewDocumentToggle}
					toggle={this.toggleViewDocument}
					centered
				>
					<ModalHeader toggle={this.toggleViewDocument}>View Documents</ModalHeader>
					<ViewPDF data={this.state.selectedDoc} />
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
		downloadExchangeDocument: data => dispatch(downloadExchangeDocument(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientDocumentExchange);
