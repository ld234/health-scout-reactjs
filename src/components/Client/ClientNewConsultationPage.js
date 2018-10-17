/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Page containing the form to add new consultation
 * Created: 24 Aug 2018
 * Last modified: 29 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import { Link } from 'react-router-dom';
import ClientNewConsultationForm from './ClientNewConsultationForm';
import '../../../style/ClientNewConsultationForm.css';
import { getConsultations } from '../../actions/consultation.actions';
import { Redirect } from 'react-router-dom';
import LoadingPage from '../Recyclable/LoadingPage';

class ClientNewConsultationPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {
				title: null,
				consultDate: null,
				summary: null,
				intervention: null,
			},
			redirect: false,
			stopLoading: false,
		};
	}

	// Redirect after 2 seconds to client's menu
	update = () => {
		setTimeout(() => {
			this.setState({ redirect: true }, () => {
				setTimeout(() => this.setState({ stopLoading: true }), 2000);
			});
			this.props.getConsultations(this.props.clientState.currentClient.patientUsername);
		}, 2000);
	};

	render() {
		if (this.state.redirect && !this.state.stopLoading) return <LoadingPage />;
		if (this.state.redirect) return <Redirect to="/client" />;
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'New Consultation'];
		const tos = [`/client`, '/client/new-consultation'];
		return (
			<div className="right">
				<ClientGeneralInfo />
				<div className="main-wrapper new-consultation-main-wrapper">
					<div className="breadcrumbs animated fadeIn">
						{breadcrumbs.map((crumb, idx) => {
							if (idx !== 0)
								return (
									<span key={'crumb' + idx}>
										{' '}
										&gt; <span>{crumb}</span>
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
					<ClientNewConsultationForm update={this.update} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		clientState: state.clients,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getConsultations: patientUsername => dispatch(getConsultations(patientUsername)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientNewConsultationPage);
