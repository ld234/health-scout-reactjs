/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Menu page for medical history
 * Created: 28 Aug 2018
 * Last modified: 2 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientGeneralInfo from '../Practitioner/PractitionerSingleClientPage/ClientGeneralInfo';
import { Modal, ModalBody, ModalHeader, ModalFooter, Tooltip } from 'mdbreact';
import { getClients } from '../../actions/client.view.actions';
import { Link } from 'react-router-dom';
import '../../../style/ClientMedicalHistoryPage.css';

class PractitionerSingleClientPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
		};
	}

	onChange = e => {
		this.setState({ searchInput: e.target.value });
	};

	renderClientListHead = (listTitle, count) => {
		return (
			<div className="practitioner-profile-head row justify-content-between">
				<div className="col col-md-8 profile-title">
					<h4>
						{listTitle} ({count})
					</h4>
				</div>
				<div className="horizontal-line">
					<hr />
				</div>
			</div>
		);
	};

	componentDidMount() {
		this.props.getClients();
	}

	render() {
		const arr = ['Consultation History', 'Medication History', 'Family History', 'Allergies'];
		const tos = [
			'/client/medical-history/consultation-history',
			'/client/medical-history/medication-history',
			'/client/medical-history/family-history',
			'/client/medical-history/allergies',
		];
		const { fName, lName } = this.props.clientState.currentClient;
		const breadcrumbs = [`${fName + ' ' + lName}`, 'Medical History'];
		const tos2 = [`/client`, '/client/medical-history'];
		return (
			<div id="practitioner-single-client-page" className="right">
				<ClientGeneralInfo />
				<div className="main-wrapper medical-history-menu">
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
										&gt; <Link to={tos2[idx]}>{crumb}</Link>
									</span>
								);
							else
								return (
									<span key={'crumb' + idx}>
										{' '}
										<Link to={tos2[idx]}>{crumb}</Link>
									</span>
								);
						})}
					</div>
					<div className="horizontal-line">
						<hr />
					</div>
					<ul className="band animated fadeIn medical-history-menu">
						{arr.map((item, idx) => {
							return (
								<li key={`menu-item-${idx}`}>
									<Link to={tos[idx]} className="menu-card" menutitle={item}>
										<div className="thumb" />
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
		clientState: state.clients,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getClients: () => dispatch(getClients()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerSingleClientPage);
