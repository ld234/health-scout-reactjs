/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Page showing the menu option for practitioner to perform for a patient
 * Created: 16 Aug 2018
 * Last modified: 29 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientGeneralInfo from './ClientGeneralInfo';
import '../../../../style/MyClientPage.css';
import { getClients } from '../../../actions/client.view.actions';
import '../../../../style/PractitionerSingleClientPage.css';
import { Link } from 'react-router-dom';

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
		const arr = ['New Consultation', 'Medical History', 'My Past Consultations', 'Document Exchange'];
		const tos = [
			'/client/new-consultation',
			'/client/medical-history',
			'/client/my-past-consultations',
			'/client/document-exchange',
		];
		return (
			<div id="practitioner-single-client-page" className="right">
				<ClientGeneralInfo />
				<div className="main-wrapper">
					<ul className="band animated fadeIn">
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
