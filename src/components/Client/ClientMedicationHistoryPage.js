import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import { Link } from 'react-router-dom';
import { getMedicationHistory } from '../../actions/medical.history.actions';
import '../../../style/ClientMedicationHistoryPage.css';

class ClientMedicationHistoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.getMedicationHistory(this.props.clientState.currentClient.patientUsername);
	}

	render() {
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Medical History', 'Medication History'];
		const tos = [`/client`, '/client/medical-history', '/client/medical-history/medication-history'];
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
					<div className="horizontal-line">
						<hr />
					</div>
					<div className="wrap-table100">
						<div className="table">
							<div className="table-row header client-medication-row">
								<div className="cell">Fill Date</div>
								<div className="cell">Medication</div>
								<div className="cell">Strength</div>
								<div className="cell">Dosage Form</div>
								<div className="cell">Quantity</div>
							</div>
							{this.props.medicalHistoryState.medicationHistory
								? this.props.medicalHistoryState.medicationHistory.map((med, idx) => {
										return (
											<div key={`med${idx}`} className="table-row client-medication-row">
												<div className="cell" data-title="Allergen">
													{med.fillDate}
												</div>
												<div className="cell" data-title="Symptoms">
													{med.medication}
												</div>
												<div className="cell" data-title="Allergen">
													{med.strength}
												</div>
												<div className="cell" data-title="Symptoms">
													{med.dosageForm}
												</div>
												<div className="cell" data-title="Allergen">
													{med.quantity}
												</div>
												<div className="cell" data-title="Symptoms">
													{med.symptom}
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

const mapStateToProps = state => {
	return {
		clientState: state.clients,
		medicalHistoryState: state.medicalHistory,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getMedicationHistory: patientUsername => dispatch(getMedicationHistory(patientUsername)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientMedicationHistoryPage);
