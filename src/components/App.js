import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import PasswordResetForm from './User/PasswordResetForm';
import ForgotPasswordForm from './User/ForgotPasswordForm';
import PractitionerPage from './Practitioner/PractitionerPage';
import Navbar from './Recyclable/Header/Navbar';
import Navigation from './Recyclable/Navigation';
import SignupForm from './containers/SignupForm/SignupForm'
import LoginForm from './User/LoginForm';
import SideNavbar from './Practitioner/SideNavbar';
import PrivateRoute from './Utilities/PrivateRoute';

class App extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return (
			<BrowserRouter>
				<div id="app">
					<Navigation />
					<Switch>
						<Route exact path="/" component={LoginForm} />
						<Route path="/register" component={SignupForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/resetPassword" component={PasswordResetForm}/>
						<Route path="/forgotPassword" component={ForgotPasswordForm}/> 
						<PrivateRoute exact path="/myclients" component={PractitionerPage} /> 
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	  authenticationState : state.authentication
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => dispatch(login(username, password)),
	  	
	};
}
  
export default connect(mapStateToProps,mapDispatchToProps)(App);