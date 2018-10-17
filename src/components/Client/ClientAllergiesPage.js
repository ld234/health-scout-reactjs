/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Component displaying the client's allergy history
 * Created: 28 Aug 2018
 * Last modified: 2 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import { Link } from 'react-router-dom';
import { getAllergies } from '../../actions/medical.history.actions';
import '../../../style/ClientAllergiesPage.css';

class ClientAllergiesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.getAllergies(this.props.clientState.currentClient.patientUsername);
	}

	render() {
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Medical History', 'Allergies'];
		const tos = [`/client`, '/client/medical-history', '/client/medical-history/allergies'];
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
							<div className="table-row header">
								<div className="cell">Allergen</div>
								<div className="cell">Medical Symptoms</div>
							</div>
							{this.props.medicalHistoryState.allergies
								? this.props.medicalHistoryState.allergies.map((allergy, idx) => {
										return (
											<div key={`allergy${idx}`} className="table-row">
												<div className="cell" data-title="Allergen">
													{allergy.allergy}
												</div>
												<div className="cell" data-title="Symptoms">
													{allergy.symptom}
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
		getAllergies: patientUsername => dispatch(getAllergies(patientUsername)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientAllergiesPage);
