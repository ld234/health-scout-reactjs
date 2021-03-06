/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Wrapper of all the registration components
 * Created: 25 Jul 2018
 * Last modified: 21 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import { validateRegister } from '../../Utilities/Validator';
import _ from 'lodash';
import ProgressBar from './SignupStepProgressBar/SignupStepProgressBar';
import AccountPage from './SignupPages/AccountPage';
import PractitionerPage from './SignupPages/PractitionerDetailPage';
import SubscriptionPaymentPage from './SignupPages/SubscriptionPaymentPage';
import AgreementPage from './SignupPages/AgreementPage';
import ConfirmationPage from './SignupPages/ConfirmationPage';
import { Elements, StripeProvider } from 'react-stripe-elements';
import axios from 'axios';
import Aux from '../../../hoc/ReactAux';
import { Button } from 'mdbreact';
import './SignupForm.css';

class SignupForm extends Component {
	state = {
		pageNo: 0,
		btnNext: false,
		errors: {},
		verificationErr: null,

		username: '',
		newPassword: '',
		confirmPassword: '',

		//Payment Detail
		stripeToken: '',
		bundle: '',

		//Practitioner bankDetail
		firstName: '',
		lastName: '',
		email: '',
		dob: '',
		gender: '',
		title: '',
		serviceProvided: '',
		abn: '',
		medicareProNum: '',
		accreditedBodies: '',
		businessName: '',
		businessAddress: '',
		selectedImg: null,
		imgTitle: '',
		description: '',
		pracType: '',

		apiKey: 'pk_test_MtzOuiItf07GsAJgk1AT5KeQ',
		agreement: false,

		registrationError: false,
	};

	componentDidMount() {
		const stripeJs = document.createElement('script');
		stripeJs.src = 'https://js.stripe.com/v3/';
		stripeJs.async = true;
		stripeJs.onload = () => {
			// The setTimeout lets us pretend that Stripe.js took a long time to load
			// Take it out of your production code!

			this.setState({
				stripe: window.Stripe(this.state.apiKey),
			});
		};
		document.body && document.body.appendChild(stripeJs);
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
		if (event.target.name == 'selectedImg') {
			if (event.target.value.toLowerCase().match('jpg$')) {
				let inputName = event.target.files[0].name;
				this.setState({ [event.target.name]: event.target.files[0] });
				this.setState({ imgTitle: inputName });
			} else {
				if (typeof event.target.files[0] === 'undefined') {
					this.setState({ imgTitle: '' });
				} else {
					this.setState({ imgTitle: '' });
					const newErr = _.merge(this.state.errors, { [event.target.name]: 'invalid input file' });
					this.setState({ errors: newErr });
				}
			}
		}
	};

	onInputClickHandler = event => {
		let newErr = this.state.errors;
		newErr[event.target.name] = '';
		this.setState({ errors: newErr });
	};

	onBlur = event => {
		if (_.isEmpty(event.target.value)) {
			const newErr = _.merge(this.state.errors, { [event.target.name]: '*field required' });
			this.setState({ errors: newErr });
		} else {
			const newErr = _.merge(this.state.errors, { [event.target.name]: '' });
			this.setState({ errors: newErr });
		}
	};

	isValidCheck = () => {
		const { errors, isValid } = validateRegister(this.state, this.state.pageNo);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	};

	setToken = token => {
		this.setState({ stripeToken: token });
	};
	setBundle = bundle => {
		this.setState({ bundle: bundle });
	};

	// Check account details for duplicate before letting user proceed
	usernameCheck = () => {
		const { pageNo, username, email } = this.state;
		axios({
			method: 'post',
			url: 'https://localhost:8080/api/user/checkUserDetails',
			data: {
				username: username,
				email: email,
			},
		})
			.then(res => {
				const resArray = res && res.data;
				if (resArray.length == 0) {
					const newPageNo = pageNo + 1;
					this.setState({ pageNo: newPageNo });
					this.setState({ verificationErr: null });
				} else {
					const errorMsg = resArray[0];
					this.setState({ verificationErr: errorMsg + ' already registered' });
				}
			})
			.catch(({ response }) => {
				const errorMsg = response && response.data && response.data.message;
				this.setState({ verificationErr: errorMsg }, () => {
					window.scrollTo(0, 0);
				});
			});
	};

	// Checks medicare provider number, business abn
	practitionerDetailCheck = () => {
		const { pageNo, verificationErr, businessAddress, businessName, abn, medicareProNum } = this.state;

		axios({
			method: 'post',
			url: 'https://localhost:8080/api/user/checkPracDetails',
			data: {
				ABN: abn,
				medicalProviderNum: medicareProNum,
				businessName: businessName,
				businessAddress: businessAddress,
			},
		})
			.then(res => {
				const resArray = res && res.data;
				if (resArray.length == 0) {
					const newPageNo = pageNo + 1;
					this.setState({ pageNo: newPageNo });
					this.setState({ verificationErr: null });
				} else {
					var errorMsg = resArray[0];
					if (errorMsg === 'ABN') {
						errorMsg = 'Invalid ABN number';
					}
					if (errorMsg == 'medicalProviderNum') {
						errorMsg = 'Medical provider number already registered ';
					}
					this.setState({ verificationErr: errorMsg });
				}
			})
			.catch(({ response }) => {
				const errorMsg = response && response.data && response.data.message;
				this.setState({ verificationErr: errorMsg }, () => {
					window.scrollTo(0, 0);
				});
			});
	};

	registerHandler = () => {
		let formData = new FormData();
		const {
			pageNo,
			username,
			newPassword,
			title,
			firstName,
			lastName,
			gender,
			email,
			dob,
			abn,
			pracType,
			serviceProvided,
			medicareProNum,
			accreditedBodies,
			businessName,
			businessAddress,
			bundle,
			stripeToken,
			description,
		} = this.state;

		// Append data to form data
		formData.append('title', title);
		formData.append('password', newPassword);
		formData.append('fName', firstName);
		formData.append('lName', lastName);
		formData.append('username', username);
		formData.append('gender', gender);
		formData.append('email', email);
		formData.append('dob', dob);
		formData.append('profilePic', this.state.selectedImg, this.state.selectedImg.name);
		formData.append('ABN', abn);
		formData.append('pracType', pracType);
		formData.append('serviceProvided', serviceProvided);
		formData.append('medicalProviderNum', medicareProNum);
		formData.append('accBody', accreditedBodies);
		formData.append('businessName', businessName);
		formData.append('businessAddress', businessAddress);
		formData.append('description', description);

		if (bundle !== 'subscription') {
			formData.append('bundle', bundle);
			formData.append('stripeToken', stripeToken);
		}

		axios
			.post('https://localhost:8080/api/user/prac', formData)
			.then(res => {
				const newPageNo = pageNo + 1;
				this.setState({ pageNo: newPageNo });
				this.setState({ verificationErr: null });
			})
			.catch(({ response }) => {
				const errorMsg = response && response.data && response.data.message;
				this.setState({ verificationErr: errorMsg }, () => {
					window.scrollTo(0, 0);
				});
			});
	};

	agreementToggle = () => {
		this.setState((prevState, props) => {
			return {
				agreement: !prevState.agreement,
			};
		});
	};

	renderError = () => {
		if (this.state.verificationErr) {
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{this.state.verificationErr}
				</div>
			);
		} else {
			return null;
		}
	};
	previousPageHandler = () => {
		const { pageNo } = this.state;
		if (pageNo <= 0) {
			return;
		}
		const newPageNo = pageNo - 1;
		this.setState({ pageNo: newPageNo });
		this.setState({ agreement: false });
	};

	nextPageHandler = () => {
		if (this.isValidCheck()) {
			const { pageNo, verificationErr } = this.state;
			if (pageNo >= 4) {
				return;
			}
			{
				switch (pageNo) {
					case 0:
						this.usernameCheck();
						break;
					case 1:
						this.practitionerDetailCheck();
						break;
					case 2:
						{
							const newPageNo = pageNo + 1;
							this.setState({ pageNo: newPageNo });
							this.setState({ verificationErr: null });
						}
						break;
					case 3:
						this.registerHandler();
						break;
					default:
				}
			}
		}
	};

	render() {
		let currentPage = null;
		let pagination = null;
		const {
			apiKey,
			username,
			newPassword,
			confirmPassword,
			firstName,
			lastName,
			email,
			dob,
			gender,
			title,
			serviceProvided,
			abn,
			medicareProNum,
			accreditedBodies,
			businessName,
			businessAddress,
			pracType,
			bundle,
			verificationErr,
			agreement,
			errors,
		} = this.state;
		switch (this.state.pageNo) {
			case 0:
				currentPage = (
					<div className="animated fadeInDown signupCard">
						<div className="singup-Header">
							<img className="signupLogo" src="../../../../style/img/healthscout_logo.png" />
							<h3>Registration</h3>
						</div>
						<ProgressBar step={this.state.pageNo} />

						{this.renderError()}
						<div className="row justify-content-md-center animated fadeInUp">
							<div className="account-page-wrapper col-xs-10 col-md-8 col-lg-6 animated fadeInUp">
								<AccountPage
									className="animated fadeInUp"
									email={email}
									username={username}
									newPassword={newPassword}
									confirmPassword={confirmPassword}
									errors={errors}
									onChange={this.onChange}
									onClick={this.onInputClickHandler}
									onBlur={this.onBlur}
									next={this.nextPageHandler}
								/>
							</div>
						</div>
						<div className="row formNav animated fadeInUp">
							<div className="col-sm-6 animated fadeInUp" />
							<div className="col-sm-3 animated fadeInUp">
								<Button
									className="btn-block animated fadeInUp signupBtn"
									color="primary"
									onClick={this.nextPageHandler}
								>
									Next
								</Button>
							</div>
						</div>
					</div>
				);
				pagination = '';
				break;
			case 1:
				currentPage = (
					<div className="signupCard">
						<div className="singup-Header">
							<img className="signupLogo" src="../../../../style/img/healthscout_logo.png" />
							<h3>Registration</h3>
						</div>
						<ProgressBar step={this.state.pageNo} />

						{this.renderError()}
						<PractitionerPage
							next={this.nextPageHandler}
							prev={this.previousPageHandler}
							firstName={firstName}
							lastName={lastName}
							dob={dob}
							gender={gender}
							title={title}
							serviceProvided={serviceProvided}
							abn={abn}
							medicareProNum={medicareProNum}
							accreditedBodies={accreditedBodies}
							businessName={businessName}
							businessAddress={businessAddress}
							pracType={pracType}
							errors={errors}
							onChange={this.onChange}
							onClick={this.onInputClickHandler}
							onBlur={this.onBlur}
							filename={this.state.imgTitle}
						/>
					</div>
				);
				pagination = (
					<div className="row">
						<div className="col-sm-3" />
						<div className="col-sm-3">
							<Button className="btn btn-block signupBtn" color="primary" onClick={this.previousPageHandler}>
								Prev
							</Button>
						</div>
						<div className="col-sm-3">
							<Button className="btn  btn-block signupBtn" color="primary" onClick={this.nextPageHandler}>
								Next
							</Button>
						</div>
						<div className="col-sm-3" />
					</div>
				);
				break;
			case 2:
				currentPage = (
					<div className="signupCard">
						<div className="singup-Header">
							<img className="signupLogo" src="../../../../style/img/healthscout_logo.png" />
							<h3>Registration</h3>
						</div>
						<ProgressBar step={this.state.pageNo} />

						{this.renderError()}
						<StripeProvider apiKey={apiKey}>
							<Elements>
								<SubscriptionPaymentPage
									setToken={this.setToken}
									setBundle={this.setBundle}
									onChange={this.onChange}
									onClick={this.onInputClickHandler}
									next={this.nextPageHandler}
									prev={this.previousPageHandler}
								/>
							</Elements>
						</StripeProvider>
					</div>
				);
				pagination = '';

				break;
			case 3:
				currentPage = (
					<div className="signupCard">
						<div className="singup-Header">
							<img className="signupLogo" src="../../../../style/img/healthscout_logo.png" />
							<h3>Registration</h3>
						</div>
						<ProgressBar step={this.state.pageNo} />

						{this.renderError()}
						<AgreementPage toggle={this.agreementToggle} />
					</div>
				);
				pagination = (
					<div className="row">
						<div className="col-sm-3" />
						<div className="col-sm-3">
							<Button className="btn btn-block signupBtn" color="primary" onClick={this.previousPageHandler}>
								Prev
							</Button>
						</div>
						{this.state.agreement ? (
							<div className="col-sm-3">
								<Button className="btn btn-block signupBtn" color="primary" onClick={this.nextPageHandler}>
									Next
								</Button>
							</div>
						) : (
							<div className="col-sm-3">
								<Button className="btn btn-block signupBtn" color="primary" disabled onClick={this.nextPageHandler}>
									Next
								</Button>
							</div>
						)}
						<div className="col-sm-3" />
					</div>
				);
				break;
			case 4:
				currentPage = (
					<div className="signupCard">
						<div className="singup-Header">
							<img className="signupLogo" src="../../../../style/img/healthscout_logo.png" />
							<h3>Registration</h3>
						</div>
						<ProgressBar step={this.state.pageNo} />
						<div>
							<ConfirmationPage />
						</div>
					</div>
				);
				break;
			default:
				currentPage = (
					<div>
						<AccountPage next={this.nextPageHandler} />
					</div>
				);
		}

		return (
			<Aux>
				{currentPage}
				{pagination}
			</Aux>
		);
	}
}

export default SignupForm;
