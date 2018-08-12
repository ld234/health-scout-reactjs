import React, { Component } from 'react';
import Button from '../Recyclable/Button';
import AlertBar from '../Recyclable/AlertBar';
import InputGroup from '../Recyclable/InputGroup';
import LoadingPage from '../Recyclable/LoadingPage';
import {Redirect, Link} from 'react-router-dom';
import { login } from '../../actions/auth.actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LoginForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			rememberMe: false,
			error: null,
			submitting: false
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
		let { username, password } = this.state;
		console.log(username, password);
		if(this.validateLoginForm(username,password)) {
			setTimeout( () => this.props.login(username, password, () => this.setState({submitting:false})),1000);
			this.setState({submitting: true});
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
		if (errorLoggingIn){
			return <AlertBar componentType="danger">{errorLoggingIn}</AlertBar>;
		}
		else if (this.state.error){
			return <AlertBar componentType="danger">{this.state.error}</AlertBar>;
		}
		return null;
	}

	render() {
		let formClass = this.props.authenticationState.loginError ? "":"animated fadeInDown " ;
		let formClass2 =  this.props.authenticationState.loginError ? "": "animated fadeInUp";
		if (this.props.authenticationState.isLoginSuccess)
			return <Redirect to="/myclients" />;
		else if (this.state.submitting)
			return <LoadingPage />
		return (
			<div className={`${formClass} container`} >
				<div className="login-container">
					<div className="app-icon"></div>
					{this.renderError()}
					<h3>Login</h3>
					<div className="form-box">
						<form className={formClass2} onSubmit={this.onSubmit} >
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
								<Link to="/forgotPassword">Forgot password?</Link>
							</div>
							<Button id="login-button" type="submit">Login</Button>
						</form>
					</div>
					<p></p>
					<hr/>
					<div className="small-text" >Not a member yet? <Link to="/register">Sign up!</Link></div>
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
    login: (username, password, callback) => dispatch(login(username, password,callback))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);