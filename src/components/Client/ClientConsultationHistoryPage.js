/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Component displaying the client's all consultation history and allow search
 * Created: 28 Aug 2018
 * Last modified: 17 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
import { getConsultations } from '../../actions/consultation.actions';
import LoadingPage from '../Recyclable/LoadingPage';

class ConsultationHistoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			searchInput: '',
			currentPage: 1,
			currentRecordNum: this.props.consultationState.consultations.length | 0,
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
						label: 'Practitioner Type',
						field: 'pracType',
						sort: 'asc',
						width: 10,
					},
					{
						label: 'Practitioner Name',
						field: 'pracName',
						sort: 'asc',
						width: 10,
					},
				],
				rows: this.props.consultationState.consultations ? this.props.consultationState.consultations : [],
			},
			selectedConsultation: {},
		};
	}

	componentDidMount() {
		this.props.getConsultations(this.props.clientState.currentClient.patientUsername, () => this.getTableData());
	}

	getTableData() {
		this.setState({
			data: {
				columns: this.state.data.columns,
				rows: this.props.consultationState.consultations,
			},
		});
	}

	onChange = e => {
		this.setState({ searchInput: e.target.value, currentPage: 1 });
	};

	toggle = selectedConsultation => {
		if (!selectedConsultation) this.setState({ modal: !this.state.modal, selectedConsultation: {} });
		else this.setState({ modal: !this.state.modal, selectedConsultation: selectedConsultation });
	};

	renderModal() {
		return (
			<Modal
				isOpen={this.state.modal}
				toggle={this.toggle}
				className="consultation-details animated fadeInUp"
				size="fluid"
				position="bottom"
			>
				<ModalHeader toggle={this.toggle}>Consultation Details</ModalHeader>
				<ModalBody>
					<Table borderless hover responsive striped>
						<TableBody>
							<tr>
								<td>Title</td>
								<td className="col-lg-9">{this.state.selectedConsultation.title}</td>
							</tr>
							<tr>
								<td>Date</td>
								<td className="col-lg-9">{this.state.selectedConsultation.date}</td>
							</tr>
							<tr>
								<td>Practitioner</td>
								<td className="col-lg-9">
									{this.state.selectedConsultation.by} - {this.state.selectedConsultation.pracType}
								</td>
							</tr>
							<tr>
								<td>Business Name</td>
								<td className="col-lg-9">{this.state.selectedConsultation.businessName}</td>
							</tr>
							<tr>
								<td>Business Address</td>
								<td className="col-lg-9">{this.state.selectedConsultation.businessAddress}</td>
							</tr>
							<tr>
								<td>Summary</td>
								<td className="col-lg-9">{this.state.selectedConsultation.summary}</td>
							</tr>
							<tr>
								<td>Intervention</td>
								<td className="col-lg-9">{this.state.selectedConsultation.intervention}</td>
							</tr>
						</TableBody>
					</Table>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={this.toggle}>
						Close
					</Button>{' '}
				</ModalFooter>
			</Modal>
		);
	}

	renderTable = () => {
		const labels = ['title', 'by', 'date', 'pracType'];
		let filteredData = this.state.data.rows.filter((row, idx) => {
			return !labels.every(label => !row[label].toLowerCase().match(`^.*${this.state.searchInput.toLowerCase()}.*$`));
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
											onClick={() => this.toggle(filteredData[idx])}
											className="table-row client-consultation-row"
										>
											<div className="cell" data-title="Consultation Title">
												{cons.title}
											</div>
											<div className="cell" data-title="Consultation Date">
												{cons.date}
											</div>
											<div className="cell" data-title="Practitioner Type">
												{cons.pracType}
											</div>
											<div className="cell" data-title="Practitioner Name">
												{cons.by}
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
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Medical History', 'Consultation History'];
		const tos = [`/client`, '/client/medical-history', '/client/medical-history/new-consultation'];
		if (this.props.consultationState.isGetConsultationsPending || !this.props.consultationState.consultations)
			return <LoadingPage />;
		else
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

const mapStateToProps = state => {
	return {
		clientState: state.clients,
		consultationState: state.consultations,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getConsultations: (patientUsername, cb) => dispatch(getConsultations(patientUsername, cb)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultationHistoryPage);
