import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, Pagination, PageItem, PageLink } from 'mdbreact';
import { getDocument } from '../../actions/document.action';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ViewPDF from '../Recyclable/LoadPdf';
import LoadingPage from '../Recyclable/LoadingPage';

class PractitionerMyDocuments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addDocumentToggle: false,
			viewDocumentToggle: false,
			editDocumentToggle: false,
			editModal: false,
			hoveredItem: null,
			pos: null,
			selectedDoc: null,
			pages: 2,
			docNum: null,
		};
	}
	componentDidMount() {
		console.log('inside component did mount', this.props.documentState.editDocumentError);
		this.props.getDocument();
		// let pages = Math.floor(this.props.documentState.documents.length / 10);
		// this.setState({ pages });
	}
	componentWillUpdate(nextprops, nextstate) {
		console.log('[Component will update]', nextprops);
	}
	toggleAddDocument = () => {
		console.log('toggle', this.state.addDocumentToggle);
		this.setState((prevState, props) => {
			return {
				addDocumentToggle: !prevState.addDocumentToggle,
			};
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
	toggleEditDocument = (doc, i) => {
		this.setState({ hoveredItem: doc });
		this.setState({ pos: i });
		this.setState((prevState, props) => {
			return {
				editDocumentToggle: !prevState.editDocumentToggle,
			};
		});
	};

	deleteDocucmentHandler = () => {};

	render() {
		let docList;
		console.log(this.props.documentState.documents);
		if (this.props.documentState.documents) {
			docList = this.props.documentState.documents.map((doc, idx) => {
				return doc == null ? null : (
					<li key={idx} className="doc-item">
						<div
							className="doc-detail"
							onClick={() => {
								this.toggleViewDocument(doc.file);
							}}
						>
							<span className="doc-number">
								<i className="fas fa-file-pdf" />
							</span>
							<span className="doc-modification">{doc.title}</span>
							<span className=" doc-desc">{doc.description}</span>
						</div>
						<div
							className="doc-modify"
							onClick={() => {
								this.toggleEditDocument(doc, idx);
							}}
						>
							<span>
								<i className="fas fa-edit" />
							</span>
						</div>
					</li>
				);
			});
		}

		let renderPagination;
		if (this.props.documentState.documents) {
			renderPagination = (
				<Pagination className="pg-blue">
					<PageItem disabled>
						<PageLink className="page-link" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</PageLink>
					</PageItem>
					<PageItem active>
						<PageLink className="page-link">
							1 <span className="sr-only">(current)</span>
						</PageLink>
					</PageItem>
					<PageItem>
						<PageLink className="page-link">2</PageLink>
					</PageItem>
					<PageItem>
						<PageLink className="page-link">3</PageLink>
					</PageItem>
					<PageItem>
						<PageLink className="page-link">4</PageLink>
					</PageItem>
					<PageItem>
						<PageLink className="page-link">5</PageLink>
					</PageItem>
					<PageItem>
						<PageLink className="page-link">&raquo;</PageLink>
					</PageItem>
				</Pagination>
			);
		}

		if (this.props.documentState.isGetDocumentPending) return <LoadingPage />;

		return (
			<div>
				<div className="practitioner-profile-head row justify-content-between">
					<div className="col col-md-8 profile-title">
						<h4>My Documents</h4>
					</div>
					<div className="col col-md-4 profile-button">
						<Button id="button" color="primary" className="button add-button" onClick={this.toggleAddDocument}>
							Add documents
						</Button>
					</div>
					<div className="horizontal-line">
						<hr />
					</div>
					<div className="col col-md-12 myDocuments">
						<div className="mydocs-wrapper">
							<div className="row">
								<div className="col"> </div>
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
								{docList}
								{renderPagination}
							</ul>
						</div>
					</div>
				</div>
				<Modal
					className="addition-modal"
					isOpen={this.state.addDocumentToggle}
					toggle={this.toggleAddDocument}
					centered
				>
					<ModalHeader toggle={this.toggleAddDocument}>Add Documents</ModalHeader>
					{React.createElement(this.props.addComponent, { toggle: this.toggleAddDocument })}
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
				<Modal
					className="addition-modal"
					isOpen={this.state.editDocumentToggle}
					toggle={this.toggleEditDocument}
					centered
				>
					<ModalHeader toggle={this.toggleEditDocument}>Edit Documents</ModalHeader>
					{React.createElement(this.props.editComponent, {
						toggle: this.toggleEditDocument,
						data: this.state.hoveredItem,
						pos: this.state.pos,
					})}
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		documentState: state.documents,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getDocument: () => dispatch(getDocument()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerMyDocuments);
