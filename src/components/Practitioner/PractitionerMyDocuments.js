/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Component displaying a form to add new qualification
 * Created: 13 Aug 2018
 * Last modified: 12 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, Pagination, PageItem, PageLink } from 'mdbreact';
import { getDocument } from '../../actions/document.action';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ViewPDF from '../Recyclable/LoadPdf';
import LoadingPage from '../Recyclable/LoadingPage';
import moment from 'moment';

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
			docNum: null,
			currentPage: 1,
		};
	}
	componentDidMount() {
		this.props.getDocument();
	}

	toggleAddDocument = () => {
		this.setState((prevState, props) => {
			return {
				addDocumentToggle: !prevState.addDocumentToggle,
			};
		});
	};
	toggleViewDocument = filepath => {
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
	setPageHandler = pageNum => {
		this.setState({ currentPage: pageNum });
	};

	prevPaginationHandler() {
		this.setState((prevState, props) => {
			return {
				currentPage: prevState.currentPage - 1,
			};
		});
	}
	nextPaginationHandler() {
		this.setState((prevState, props) => {
			return {
				currentPage: prevState.currentPage + 1,
			};
		});
	}
	render() {
		if (this.props.documentState.isGetDocumentPending) return <LoadingPage />;
		let renderPagination = null;
		if (this.props.documentState.documents && this.props.documentState.documents.length) {
			let pages =
				this.props.documentState.documents.length % 5 == 0
					? this.props.documentState.documents.length / 5
					: Math.floor(this.props.documentState.documents.length / 5) + 1;
			renderPagination = (
				<Pagination className="pg-blue normal-pagination">
					{this.state.currentPage == 1 ? (
						<PageItem disabled onClick={() => this.prevPaginationHandler()}>
							<PageLink className="page-link" aria-label="Previous">
								<span aria-hidden="true">&laquo;</span>
								<span className="sr-only">Previous</span>
							</PageLink>
						</PageItem>
					) : (
						<PageItem onClick={() => this.prevPaginationHandler()}>
							<PageLink className="page-link" aria-label="Previous">
								<span aria-hidden="true">&laquo;</span>
								<span className="sr-only">Previous</span>
							</PageLink>
						</PageItem>
					)}
					{Array.apply(null, { length: pages }).map((doc, idx) => {
						if (idx + 1 === this.state.currentPage) {
							return (
								<PageItem key={'page' + (idx + 1)} active>
									<PageLink className="page-link">
										{idx + 1} <span className="sr-only">(current)</span>
									</PageLink>
								</PageItem>
							);
						} else if (idx + 1 == this.state.currentPage - 1) {
							return (
								<PageItem key={'page' + (idx + 1)} onClick={() => this.setPageHandler(idx + 1)}>
									<PageLink className="page-link">
										{idx + 1} <span className="sr-only">(current)</span>
									</PageLink>
								</PageItem>
							);
						} else if (idx + 1 == this.state.currentPage + 1) {
							return (
								<PageItem key={'page' + (idx + 1)} onClick={() => this.setPageHandler(idx + 1)}>
									<PageLink className="page-link">
										{idx + 1} <span className="sr-only">(current)</span>
									</PageLink>
								</PageItem>
							);
						}
					})}

					{this.state.currentPage == pages ? (
						<PageItem disabled onClick={() => this.nextPaginationHandler()}>
							<PageLink className="page-link">&raquo;</PageLink>
						</PageItem>
					) : (
						<PageItem onClick={() => this.nextPaginationHandler()}>
							<PageLink className="page-link">&raquo;</PageLink>
						</PageItem>
					)}
				</Pagination>
			);
		}
		let docList;
		if (this.props.documentState.documents) {
			docList = this.props.documentState.documents.filter(
				(doc, idx) => Math.floor(idx / 5) + 1 === this.state.currentPage
			);
			docList = docList.map((doc, idx) => {
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
							<span>{doc.title}</span>
							<span>{doc.description}</span>
							<span>
								{moment(doc.lastModified, 'DD-MM-YYYY HH:mm:ss')
									.add(10, 'hours')
									.format('DD-MM-YYYY HH:mm:ss')}
							</span>
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

		let header =
			this.props.documentState.documents && this.props.documentState.documents.length ? (
				<div className="row doc-header">
					<div className="col">DOCUMENT NAME</div>
					<div className="col">DESCRIPTION</div>
					<div className="col">LAST MODIFIED</div>
				</div>
			) : null;

		return (
			<div>
				<div className="practitioner-profile-head row justify-content-between">
					<div className="col col-md-8 profile-title">
						<h4>My Documents</h4>
					</div>
					<div className="col col-md-4 profile-button">
						<Button id="button" color="primary" className="button add-button" onClick={this.toggleAddDocument}>
							Add Documents
						</Button>
					</div>
					<div className="horizontal-line">
						<hr />
					</div>
					<div className="col col-md-12 myDocuments">
						<div className="mydocs-wrapper">
							{header}
							<ul className="rolldown-list" id="myList">
								<ReactCSSTransitionGroup
									transitionName="specialtyFade"
									transitionEnterTimeout={500}
									transitionLeaveTimeout={500}
								/>
								{docList}
							</ul>
						</div>
						{renderPagination}
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
					<ViewPDF url={this.state.selectedDoc} />
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
						pos: this.state.pos + 5 * (this.state.currentPage - 1),
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
