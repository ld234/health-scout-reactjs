import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import PasswordResetForm from './User/PasswordResetForm';
import ForgotPasswordForm from './User/ForgotPasswordForm';
import PractitionerPage from './Practitioner/PractitionerPage';
import Navbar from './Recyclable/Header/Navbar';
import Navigation from './Recyclable/Navigation';
<<<<<<< HEAD
import SignupForm from './User/Signup/SignupForm'
=======
>>>>>>> 966985b9e2c87945f55c327cec823a426d1de91e
import LoginForm from './User/LoginForm';
import HomePage from './HomePage';
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
<<<<<<< HEAD
						<Route exact path="/" component={LoginForm} />
						<Route path="/register" component={SignupForm} />
=======
						<Route exact path="/" component={HomePage} />
>>>>>>> 966985b9e2c87945f55c327cec823a426d1de91e
						<Route path="/login" component={LoginForm} />
						<Route path="/resetPassword" component={PasswordResetForm}/>
						<Route path="/forgotPassword" component={ForgotPasswordForm}/> 
						<PrivateRoute exact path="/profile" component={PractitionerPage} /> 
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