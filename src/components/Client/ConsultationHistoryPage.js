import React, { Component } from 'react';
import { MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, TableBody } from 'mdbreact';
import { connect } from 'react-redux';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import '../../../style/ConsultationHistoryPage.css';
import { Link } from 'react-router-dom';
import { getConsultations } from '../../actions/consultation.actions';
import LoadingPage from '../Recyclable/LoadingPage';

function sortObject(o) {
	return Object.keys(o)
		.sort()
		.reduce((r, k) => ((r[k] = o[k]), r), {});
}

class ConsultationHistoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			searchInput: '',
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
		// console.log(this.props);
		this.setState({
			data: {
				columns: this.state.data.columns,
				rows: this.props.consultationState.consultations,
			},
		});
	}

	onChange = e => {
		this.setState({ searchInput: e.target.value });
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

	render() {
		console.log('rendering consultation history page');
		let newData = { columns: this.state.data.columns, rows: [] };
		// console.log(this.state.searchInput);
		// if (this.props.consultationState.consultations)
		newData = {
			columns: this.state.data.columns,
			rows: this.state.data.rows.filter(c => c.by.match(`^.*${this.state.searchInput}.*$`)).map((consultation, idx) => {
				return {
					title: (
						<div onClick={() => this.toggle(this.props.consultationState.consultations[idx])}>{consultation.title}</div>
					),
					date: (
						<div onClick={() => this.toggle(this.props.consultationState.consultations[idx])}>{consultation.date}</div>
					),
					pracType: (
						<div onClick={() => this.toggle(this.props.consultationState.consultations[idx])}>
							{consultation.pracType}
						</div>
					),
					pracName: (
						<div onClick={() => this.toggle(this.props.consultationState.consultations[idx])}>{consultation.by}</div>
					),
				};
			}),
		};
		// console.log(newData);
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Medical History', 'Consultation History'];
		const tos = [`/client`, '/client/medical-history', '/client/medical-history/new-consultation'];
		if (this.props.consultationState.isGetConsultationsPending) return <LoadingPage />;
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
						<MDBDataTable
							className="editable-data-table"
							hover
							borderless
							data={{ ...newData }}
							responsive
							searching={true}
							sortable={false}
						/>
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
