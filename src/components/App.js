import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import PasswordResetForm from './User/PasswordResetForm';
import ForgotPasswordForm from './User/ForgotPasswordForm';
import PractitionerPage from './Practitioner/PractitionerPage';
import MyDocumentPage from './Practitioner/PractitionerMyDocumentsPage'
import Navbar from './Recyclable/Header/Navbar';
import Navigation from './Recyclable/Navigation';
import SignupForm from './User/Signup/SignupForm';
import LoginForm from './User/LoginForm';
import HomePage from './HomePage';
import MyClientPage from './Practitioner/PractitionerMyClients/PractitionerMyClientsPage';
import PrivateRoute from './Utilities/PrivateRoute';
import SingleClientPage from './Practitioner/PractitionerSingleClientPage/PractitionerSingleClientPage';

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
<<<<<<< Updated upstream
						<Route path="/resetPassword" component={PasswordResetForm} />
						<Route path="/forgotPassword" component={ForgotPasswordForm} />
						<PrivateRoute exact path="/profile" component={PractitionerPage} />
						<PrivateRoute exact path="/myclients" component={MyClientPage} />
						<PrivateRoute path="/client" component={SingleClientPage} />
					</Switch>
=======
						<Route path="/resetPassword" component={PasswordResetForm}/>
						<Route path="/forgotPassword" component={ForgotPasswordForm}/> 
						<PrivateRoute exact path="/profile" component={PractitionerPage} /> 
						<PrivateRoute exact path="/mydocs" component={MyDocumentPage} /> 

					</Switch>																																					
>>>>>>> Stashed changes
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
