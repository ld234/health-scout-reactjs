import React, { Component } from 'react';
import Button from '../Recyclable/Button';
import AlertBar from '../Recyclable/AlertBar';
import InputGroup from '../Recyclable/InputGroup';
import LoadingPage from '../Recyclable/LoadingPage';
import SuccessCheckMark from '../Recyclable/SuccessCheckMark';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'query-string';
import $ from 'jquery';

class ForgotPasswordForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
            isEmail : false,
            resetMeans:'',
			token: '',
			loading: false,
			error: null,
            success: false,
            successMessage: ''
		};
    }
    
	validateForgotPasswordForm = (event) => {
        event.preventDefault();
        const emailRegex = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
        const usernameRegex = '^[a-zA-Z0-9]{6,}$'
		if(this.state.resetMeans.match(emailRegex) ){
            console.log('matched email');
            this.setState({ isEmail: true }, function (){
                this.onSubmit()
            });
            
        }
        else if (this.state.resetMeans.match(usernameRegex)){
            this.setState({ isEmail: false }, function (){
                this.onSubmit();
            });
        }
        else{
            this.setState({error: 'Invalid username or email.'});
        }
		
	}

	componentDidMount(){
		if (this.state.loading) {
			$(window).load(function() {
				$(".bg_load").fadeOut("slow");
				$(".wrapper").fadeOut("slow");
			})
		}
	}
	
	onSubmit = () =>  {
        //event.preventDefault();
        let reqBody;
        let { resetMeans } = this.state;
        if(this.state.isEmail) {
            reqBody = {email: resetMeans};
            console.log('in isEmail');
        }
        else {
            reqBody = {username: resetMeans};
        }
        this.setState({loading:true})
        console.log('request body', reqBody);
        axios.put('http://localhost:8888/auth/forgetPassword',reqBody)
        .then( response => {
            this.setState({loading:false, success:true, successMessage:response.data.message});
        })
        .catch ( err => {
            setTimeout( () => this.setState({loading:false, error: err.response.data.message} ), 200);
        });
		
		this.setState({
		    password: '',
            passwordConfirm: ''
		});
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
					<h6>{this.state.successMessage}</h6>		
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
						<h3>Forgot password?</h3>
                        <div className="small-text">
                        <p >Please provide your username or email which you used to register with us.</p>
						</div>
                        <div className="form-box">
							<form className="animated fadeInUp" onSubmit={this.validateForgotPasswordForm} >
								<InputGroup 
									id="reset-means"
									name="resetMeans" 
									type="text" 
									placeholder="username or email" 
									onChange={this.onFieldsChange}
									value={this.state.resetMeans}
								/>
								<Button>Send reset email</Button>
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

export default ForgotPasswordForm;