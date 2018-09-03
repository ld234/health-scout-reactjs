import React, { Component } from 'react';
import { MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, TableBody } from 'mdbreact';
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
		console.log('component did mount', this.props.clientState.currentClient.fName);
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
		console.log('data', this.state.data.rows);
		const filteredData = this.state.data.rows
			.filter((row, idx) => {
				return !labels.every(label => !row[label].match(`^.*${this.state.searchInput}.*$`));
			})
			.splice((this.state.currentPage - 1) * 10, 10);
		console.log('filteredData', filteredData);
		return (
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
										onClick={() => this.toggle(this.props.consultationState.consultations[idx])}
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
		);
	};

	render() {
		console.log('rendering consultation history page');
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
						<div className="table-metadata">
							<div className="table-current-show">
								Showing{' '}
								{(this.state.currentPage - 1) * 10 + 1 > this.props.consultationState.consultations.length
									? this.props.consultationState.consultations.length
									: (this.state.currentPage - 1) * 10 + 1}
								-
								{this.state.currentPage * 10 > this.props.consultationState.consultations.length
									? this.props.consultationState.consultations.length
									: this.state.currentPage * 10}{' '}
								of {this.props.consultationState.consultations.length} consultations
							</div>
							<div className="page-numbers-group">
								<div className="page-numbers-float-wrapper">
									{Array.apply(null, { length: Math.ceil(this.props.consultationState.consultations.length / 10) }).map(
										(number, idx) => {
											if (this.state.currentPage === idx + 1)
												return (
													<button
														key={'page' + idx}
														onClick={() => this.setState({ currentPage: idx + 1 })}
														className="page-number page-number-clicked"
													>
														{idx + 1}
													</button>
												);
											return (
												<button
													key={'page' + idx}
													onClick={() => this.setState({ currentPage: idx + 1 })}
													className="page-number"
												>
													{idx + 1}
												</button>
											);
										}
									)}
								</div>
							</div>
						</div>
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
