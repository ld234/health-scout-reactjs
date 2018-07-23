import React, { Component } from 'react';
import Button from '../Recyclable/Button';
import AlertBar from '../Recyclable/AlertBar';
import InputGroup from '../Recyclable/InputGroup';
import LoadingPage from '../Recyclable/LoadingPage';
import SuccessCheckMark from '../Recyclable/SuccessCheckMark';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'query-string';

class PasswordResetForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
			password: '',
            passwordConfirm: '',
			token: '',
			loading: false,
			error: null,
			success: false
		};
	}
	
	validateLoginForm = (newPassword, newPasswordConfirm) => {
        console.log(newPassword,newPasswordConfirm)
        if (newPassword.localeCompare(newPasswordConfirm) !== 0){
            this.setState({error: 'Passwords do not match.'});
            return false;
        }
        else if(newPassword.length < 8){
            this.setState({error: 'Password must be longer than 8 characters'});
            return false;
        }
		else if(!newPassword.match('^(?=.{8,})(?=.*[0-9].*)(?=.*[A-Za-z].*).*$') ){
            this.setState({error: 'Password must contain a mixture of letters and digits.'});
		    return false;
        }
		return true;		
	}
	
	onSubmit = (event) =>  {
        event.preventDefault();
        const parsed = qs.parse(this.props.location.search) ;    
		let { password, passwordConfirm, token } = this.state;
		if(this.validateLoginForm(password,passwordConfirm)) {
			this.setState({loading:true},function(){
				axios.put('http://localhost:8888/auth/resetPassword',{
					newPassword: password,
					token: parsed.id
				})
				.then( response => {
					this.setState({loading:false, success:true});
				})
				.catch ((err) => {
					setTimeout( () => this.setState({loading:false, error: err.response.data.message} ), 1000);
				});
			
				this.setState({
					password: '',
					passwordConfirm: ''
				});
			});
		}
	}
	
	onFieldsChange = (e) => {
		this.setState({ [e.target.name]: e.target.value , error: ''});
	}
	
	renderError = () =>{
		if (this.state.error){
            return <AlertBar>{this.state.error}</AlertBar>
		}
        return null;
	}
	
	renderSuccess = () => {
		return (
			<div className="container">
				<div className="login-container">	
					<SuccessCheckMark />
					<h6>Successfully reset password</h6>
					<Link to="/login" style={{textDecoration:'none'}}><Button>Click here to login"</Button></Link>				
				</div>
			</div>
		);
	}

	render() {
		if (!this.state.loading && !this.state.success)
			return (
				<div className="animated fadeInDown container">
					<div className="login-container">
						{this.renderError()}
						<div className="app-icon"></div>
						<h3>Reset password</h3>
						<div className="form-box">
							<form className="animated fadeInUp" onSubmit={this.onSubmit} >
								<InputGroup 
									id="reset-password"
									name="password" 
									type="password" 
									placeholder="password" 
									onChange={this.onFieldsChange}
									value={this.state.password}
								/>
								<InputGroup 
									id="reset-password-confirm"
									name="passwordConfirm" 
									type="password" 
									placeholder="confirm password" 
									onChange={this.onFieldsChange}
									onPaste={ (e) => e.preventDefault() } 
									value={this.state.passwordConfirm}
								/>
								<Button>Reset password</Button>
							</form>
						</div>
					</div>
				</div>
			);
		if (!this.state.loading && this.state.success)
			return (this.renderSuccess());
		return (
			<LoadingPage />
		);

	}
}

export default PasswordResetForm;