import React, { Component } from 'react';
import {
	Pagination,
	PageItem,
	PageLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Table,
	TableBody,
} from 'mdbreact';
import { connect } from 'react-redux';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import '../../../style/ConsultationHistoryPage.css';
import { Link } from 'react-router-dom';
import { getConsultations, editConsultation, setEditConsultationError } from '../../actions/consultation.actions';
import LoadingPage from '../Recyclable/LoadingPage';
import DatePicker from '../Recyclable/SingleDatePicker';
import moment from 'moment';

class ClientMyPastConsultationPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			errors: {},
			searchInput: '',
			currentPage: 1,
			data: {
				columns: [
					{
						label: 'Consultation Title',
						field: 'title',
						sort: 'asc',
						width: 200,
					},
					{
						label: 'Consultation Date',
						field: 'date',
						sort: 'asc',
						width: 100,
					},
					{
						label: 'Summary',
						field: 'summary',
						sort: 'asc',
						width: 10,
					},
					{
						label: 'Intervention',
						field: 'intervention',
						sort: 'asc',
						width: 10,
					},
				],
				rows: this.props.consultationState.consultations
					? this.props.consultationState.consultations.filter(consultation => {
							return consultation.pracUsername === this.props.userState.user.username;
					  })
					: [],
			},
			oldSelectedConsultation: {},
			selectedConsultation: {},
		};
	}

	onDateChange = date => {
		this.setState({ selectedConsultation: { ...this.state.selectedConsultation, date } });
	};

	onFocus = event => {
		this.props.setEditConsultationError(null);
	};

	onBlur = event => {
		if (_.isEmpty(event.target.value)) {
			const newErr = _.merge(this.state.errors, { [event.target.name]: '*field required' });
			this.setState({ errors: newErr });
		} else {
			const newErr = _.merge(this.state.errors, { [event.target.name]: '' });
			this.setState({ errors: newErr });
		}
	};

	componentDidMount() {
		this.props.getConsultations(this.props.clientState.currentClient.patientUsername, () => this.getTableData());
	}

	getTableData() {
		const newRows = this.props.consultationState.consultations.filter(consultation => {
			return consultation.pracUsername === this.props.userState.user.username;
		});
		this.setState({
			data: {
				columns: this.state.data.columns,
				rows: newRows,
			},
		});
	}

	onChange = e => {
		this.setState({ searchInput: e.target.value, currentPage: 1 });
	};

	onInputChange = e => {
		this.setState({ selectedConsultation: { ...this.state.selectedConsultation, [e.target.name]: e.target.value } });
	};

	toggle = (selectedConsultation, justClicked) => {
		this.props.setEditConsultationError(null);
		if (!selectedConsultation) this.setState({ modal: !this.state.modal, selectedConsultation: {} });
		else
			this.setState({
				modal: !this.state.modal,
				selectedConsultation: selectedConsultation,
				justClicked,
				oldSelectedConsultation: selectedConsultation,
			});
	};

	renderError = () => {
		let { editConsultationError } = this.props.consultationState;
		if (editConsultationError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{editConsultationError}
				</div>
			);
		return null;
	};

	renderModal() {
		console.log('selected consultation', this.state.selectedConsultation);
		return (
			<Modal isOpen={this.state.modal} toggle={this.toggle} className="consultation-details animated fadeInUp" centered>
				<ModalHeader toggle={this.toggle}>Consultation Details</ModalHeader>
				<ModalBody>
					<form onSubmit={this.validateForm}>
						{this.renderError()}
						<label htmlFor="consultation-date-input" className="grey-text">
							Consultation Date
						</label>
						<DatePicker
							name="consultDate"
							id="consultation-date-input"
							onChange={this.onDateChange}
							value={this.state.selectedConsultation.consultDate}
							onBlur={this.onBlur}
							date={moment(this.state.selectedConsultation.date, 'YYYY-MM-DD')}
						/>
						<label className="errorMsg clearfix">{this.state.errors.consultDate}</label>
						<label htmlFor="title-input" className="grey-text">
							Consultation Title
						</label>
						<input
							name="title"
							type="text"
							id="title-input"
							className="form-control"
							onChange={this.onInputChange}
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							value={this.state.selectedConsultation.title}
						/>
						<label className="errorMsg clearfix">{this.state.errors.title}</label>
						<label htmlFor="summary-input" className="grey-text">
							Consultation Summary
						</label>
						<textarea
							name="summary"
							type="text"
							id="summary-input"
							rows="4"
							className="form-control"
							placeholder="A brief summary of what has been discussed during the consultation..."
							onChange={this.onInputChange}
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							value={this.state.selectedConsultation.summary}
						/>
						<label className="errorMsg">{this.state.errors.summary}</label>
						<label htmlFor="intervention-input" className="grey-text">
							Intervention
						</label>
						<textarea
							name="intervention"
							type="text"
							id="intervention-input"
							rows="4"
							className="form-control"
							placeholder="Instructions to patients after consultation..."
							onChange={this.onInputChange}
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							value={this.state.selectedConsultation.intervention}
						/>
						<label className="errorMsg">{this.state.errors.intervention}</label>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={this.toggle}>
						Close
					</Button>{' '}
					<Button
						color="primary"
						onClick={() =>
							this.props.editConsultation(
								{
									summary: this.state.selectedConsultation.summary,
									intervention: this.state.selectedConsultation.intervention,
									oldConsultDate: this.state.oldSelectedConsultation.date,
									newConsultDate: this.state.selectedConsultation.date.format('YYYY-MM-DD'),
									patientUsername: this.props.clientState.currentClient.patientUsername,
									title: this.state.selectedConsultation.title,
								},
								this.state.justClicked,
								() => {
									this.toggle();
									this.setState({
										data: {
											columns: this.state.data.columns,
											rows: this.props.consultationState.consultations.filter(consultation => {
												return consultation.pracUsername === this.props.userState.user.username;
											}),
										},
									});
								}
							)
						}
					>
						Save changes
					</Button>
				</ModalFooter>
			</Modal>
		);
	}

	validateForm = e => {
		e.preventDefault();
		const { title, consultDate, summary, intervention } = this.state;
		const fields = ['title', 'consultDate', 'summary', 'intervention'];
		if (!fields.every(field => !_.isEmpty(this.state[field]))) {
			this.setState({ error: 'All fields are required.' });
		} else {
			this.props.addConsultation(
				{
					title,
					consultDate,
					summary,
					intervention,
					patientUsername: this.props.clientState.currentClient.patientUsername,
				},
				() => {
					this.props.update();
					this.clear();
				}
			);
		}
	};

	renderTable = () => {
		const labels = ['title', 'by', 'date', 'pracType'];
		let filteredData = this.state.data.rows.filter((row, idx) => {
			return !labels.every(label => !row[label].match(`^.*${this.state.searchInput}.*$`));
		});
		if (this.state.currentRecordNum !== filteredData.length) this.setState({ currentRecordNum: filteredData.length });
		filteredData = filteredData.splice((this.state.currentPage - 1) * 5, 5);
		return (
			<div className="table-wrapper">
				<div className="wrap-table100">
					<div className="table">
						<div className="table-row header client-consultation-row">
							{this.state.data.columns.map(({ label }, idx) => {
								return (
									<div key={idx} className="cell">
										{label}
									</div>
								);
							})}
						</div>
						{filteredData
							? filteredData.map((cons, idx) => {
									return (
										<div
											key={`med${idx}`}
											onClick={() => this.toggle(this.props.consultationState.consultations[idx], idx)}
											className="table-row client-consultation-row"
										>
											<div className="cell" data-title="Consultation Title">
												{cons.title}
											</div>
											<div className="cell" data-title="Consultation Date">
												{moment(cons.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
											</div>
											<div className="cell" data-title="Summary">
												{cons.summary.substr(0, 35)}
												{cons.summary.length > 35 ? '...' : ''}
											</div>
											<div className="cell" data-title="Intervention">
												{cons.intervention.substr(0, 35)}
												{cons.intervention.length > 35 ? '...' : ''}
											</div>
										</div>
									);
							  })
							: null}
					</div>
				</div>
			</div>
		);
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

	renderPagination = () => {
		let pages =
			this.state.currentRecordNum % 5 !== 0
				? Math.floor(this.state.currentRecordNum / 5) + 1
				: this.state.currentRecordNum / 5;
		return (
			<Pagination className="pg-blue normal-pagination">
				{this.state.currentPage === 1 ? (
					<PageItem disabled>
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
	};

	render() {
		console.log('rendering consultation history page');
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'My Past Consultations'];
		const tos = [`/client`, '/client/my-past-consultations'];
		if (this.props.consultationState.isGetConsultationsPending || !this.props.consultationState.consultations)
			return <LoadingPage />;
		else if (this.props.consultationState.consultations && this.state.data.rows)
			return (
				<div id="consultation-history" className="consultation-history right">
					<ClientGeneralInfo />
					<div className="main-wrapper">
						<div className="search-wrapper">
							<div className="search-container">
								<input onChange={this.onChange} value={this.state.searchInput} type="text" placeholder="Search..." />
								<div className="search" onClick={() => this.setState({ searchInput: '' })} />
							</div>
						</div>
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
						<div className="horizontal-line">
							<hr />
						</div>
						{this.renderTable()}
						<div className="table-current-show">
							Showing{' '}
							{(this.state.currentPage - 1) * 5 + 1 > this.state.currentRecordNum
								? this.state.currentRecordNum
								: (this.state.currentPage - 1) * 5 + 1}
							-
							{this.state.currentPage * 5 > this.state.currentRecordNum
								? this.state.currentRecordNum
								: this.state.currentPage * 5}{' '}
							of {this.state.currentRecordNum} consultations
						</div>
						{this.renderPagination()}
					</div>
					{this.renderModal()}
				</div>
			);
	}
}

// {newData.rows.map((e, idx) => <div key={idx}>{e.by} {newData.rows.length}</div>)}
const mapStateToProps = state => {
	return {
		clientState: state.clients,
		consultationState: state.consultations,
		userState: state.userDetails,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getConsultations: (patientUsername, cb) => dispatch(getConsultations(patientUsername, cb)),
		editConsultation: (obj, idx, cb) => dispatch(editConsultation(obj, idx, cb)),
		setEditConsultationError: bool => dispatch(setEditConsultationError(bool)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientMyPastConsultationPage);
