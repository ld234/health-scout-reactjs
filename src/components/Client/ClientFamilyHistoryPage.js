import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import { Link } from 'react-router-dom';
import { getFamilyHistory } from '../../actions/medical.history.actions';
import LoadingPage from '../Recyclable/LoadingPage';

class ClientFamilyHistoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.getFamilyHistory(this.props.clientState.currentClient.patientUsername);
	}

	render() {
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Medical History', 'Family History'];
		const tos = [`/client`, '/client/medical-history', '/client/medical-history/family-history'];
		if (this.props.medicalHistoryState.isGetFamilyHistoryPending) return <LoadingPage />;
		else
			return (
				<div className="allergy-history right animated fadeIn">
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
						<div className="horizontal-line">
							<hr />
						</div>
						<div className="wrap-table100">
							<div className="table">
								<div className="table-row header">
									<div className="cell">Relationship</div>
									<div className="cell">Medical Condition</div>
								</div>
								{this.props.medicalHistoryState.familyHistory
									? this.props.medicalHistoryState.familyHistory.map((fam, idx) => {
											return (
												<div key={`fam${idx}`} className="table-row">
													<div className="cell" data-title="Relationship">
														{fam.familyRelation}
													</div>
													<div className="cell" data-title="Medical Condition">
														{fam.familyCondition}
													</div>
												</div>
											);
									  })
									: null}
							</div>
						</div>
					</div>
				</div>
			);
	}
}

/*
<Table hover bordered responsive>
						<TableHead>
							<tr>
								<th>Relationship</th>
								<th>Medical Condition</th>
							</tr>
						</TableHead>
						<TableBody>
							{this.props.medicalHistoryState.familyHistory
								? this.props.medicalHistoryState.familyHistory.map((fam, idx) => {
										return (
											<tr key={`fam${idx}`}>
												<td>{fam.familyRelation}</td>
												<td>{fam.familyCondition}</td>
											</tr>
										);
								  })
								: null}
						</TableBody>
					</Table>*/

const mapStateToProps = state => {
	return {
		clientState: state.clients,
		medicalHistoryState: state.medicalHistory,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getFamilyHistory: patientUsername => dispatch(getFamilyHistory(patientUsername)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientFamilyHistoryPage);
