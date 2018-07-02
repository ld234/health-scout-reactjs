import React, { Component } from 'react';
import Button from '../Recyclable/Button';
import AlertBar from '../Recyclable/AlertBar';
import InputGroup from '../Recyclable/InputGroup';
import {Redirect} from 'react-router-dom';
import { login } from '../../actions/auth.actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class LoginForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			rememberMe: false,
			submitting: false,
			error: null
		};
	}

	onChangeCheckBox = (event) => {
		this.setState({  [event.target.name]: event.target.checked });
	};
	
	validateLoginForm = (username,password) => {
		if(username.length > 0 && password.length > 0){
		    return true;
		}
		return false;		
	}
	
	onSubmit = (event) =>  {
		event.preventDefault();
		console.log('submitted');
		let { username, password } = this.state;
		console.log(username, password);
		if(this.validateLoginForm(username,password)) {
			this.props.login(username, password);
		}
		else{
			this.setState({error: 'All fields are required' });
		}
		this.setState({
		    username: '',
		    password: ''
		});
		
		
	}
	
	onFieldsChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	renderError = () =>{
		let errorLoggingIn = this.props.authenticationState.loginError;
		if (errorLoggingIn)
			return <AlertBar componentType="danger">{errorLoggingIn}</AlertBar>;
		else if (this.state.error)
			return <AlertBar componentType="danger">{this.state.error}</AlertBar>;
		return null;
	}

	render() {
		if (this.props.authenticationState.isLoginSuccess)
			return <Redirect to="/" />;
		return (
			<div className="container">
				<div className="login-container">
					
					<div className="avatar"></div>
					{this.renderError()}
					<h3>Login</h3>
					<div className="form-box">
						<form onSubmit={this.onSubmit} >
							<InputGroup 
								name="username" 
								type="text" 
								placeholder="username" 
								onChange={this.onFieldsChange}
								value={this.state.username}
							/>
							<InputGroup 
								name="password" 
								type="password" 
								placeholder="password" 
								onChange={this.onFieldsChange}
								value={this.state.password}
							/>
							<div className="small-text" >
								<a href="#">Forgot password?</a>
							</div>
							<Button buttonLabel="Login" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    authenticationState: state.authentication
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);