import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import PasswordResetForm from './User/PasswordResetForm';
import ForgotPasswordForm from './User/ForgotPasswordForm';
import PractitionerPage from './Practitioner/PractitionerPage';
import MyDocumentPage from './Practitioner/PractitionerMyDocumentsPage';
import Navbar from './Recyclable/Header/Navbar';
import Navigation from './Recyclable/Navigation';
import SignupForm from './User/Signup/SignupForm';
import LoginForm from './User/LoginForm';
import HomePage from './HomePage';
import MyClientPage from './Practitioner/PractitionerMyClients/PractitionerMyClientsPage';
import PrivateRoute from './Utilities/PrivateRoute';
import SingleClientPage from './Practitioner/PractitionerSingleClientPage/PractitionerSingleClientPage';
import ClientNewConsultationPage from './Client/ClientNewConsultationPage';
import ClientMedicalHistoryPage from './Client/ClientMedicalHistoryPage';
import ConsultationHistoryPage from './Client/ClientConsultationHistoryPage';
import SettingsPage from './Settings/SettingsPage';
import AccountActivationPage from './User/AccountActivationPage';
import ClientAllergiesPage from './Client/ClientAllergiesPage';
import ClientFamilyHistoryPage from './Client/ClientFamilyHistoryPage';
import ClientMedicationHistoryPage from './Client/ClientMedicationHistoryPage';
import ClientDocumentExchangePage from './Client/ClientDocumentExchange';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
				<div id="app">
					<Navigation />
					<Switch>
						<Route path="/register" component={SignupForm} />
						<Route exact path="/" component={HomePage} />
						<Route path="/login" component={LoginForm} />
						<Route path="/resetPassword" component={PasswordResetForm} />
						<Route path="/forgotPassword" component={ForgotPasswordForm} />
						<Route path="/verify" component={AccountActivationPage} />
						<PrivateRoute exact path="/profile" component={PractitionerPage} />
						<PrivateRoute exact path="/myclients" component={MyClientPage} />
						<PrivateRoute exact path="/client" component={SingleClientPage} />
						<PrivateRoute exact path="/client/new-consultation" component={ClientNewConsultationPage} />
						<PrivateRoute exact path="/client/medical-history" component={ClientMedicalHistoryPage} />
						<PrivateRoute exact path="/client/document-exchange" component={ClientDocumentExchangePage} />

						<PrivateRoute path="/client/medical-history/consultation-history" component={ConsultationHistoryPage} />
						<PrivateRoute path="/client/medical-history/allergies" component={ClientAllergiesPage} />
						<PrivateRoute path="/client/medical-history/family-history" component={ClientFamilyHistoryPage} />
						<PrivateRoute path="/client/medical-history/medication-history" component={ClientMedicationHistoryPage} />
						<PrivateRoute path="/settings" component={SettingsPage} />
						<PrivateRoute exact path="/mydocs" component={MyDocumentPage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticationState: state.authentication,
	};
};

export default connect(mapStateToProps)(App);
