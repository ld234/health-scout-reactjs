import React, { Component } from 'react';
import _ from 'lodash';
import styles from './SignupForm.css';
import Aux from '../../hoc/ReactAux';
import ProgressBar from '../../components/User/Signup/SignupStepProgressBar/SignupStepProgressBar';
import AccountPage from '../../components/User/Signup/SignupPages/AccountPage';
import PractitionerPage from '../../components/User/Signup/SignupPages/PractitionerDetailPage';
import SubscriptionPaymentPage from '../../components/User/Signup/SignupPages/SubscriptionPaymentPage';
import AgreementPage from '../../components/User/Signup/SignupPages/AgreementPage';
import ConfirmationPage from '../../components/User/Signup/SignupPages/ConfirmationPage';
import { validateRegister } from '../../components/Utility/Validator';
import { Elements, StripeProvider } from 'react-stripe-elements';
import buttons from '../../components/Recyclable/Button.css';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AlertBar from '../../components/Recyclable/AlertBar';

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
		description: '',
		pracType: '',

		agreement: null,

		registrationError: false,
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
		if (event.target.name == 'selectedImg') {
			console.log('select image onChange', event.target.files);
			this.setState({
				selectedImg: event.target.files[0],
			});
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
			console.log(errors);
		}
		return isValid;
	};

	setToken = token => {
		this.setState({ stripeToken: token });
		console.log('token ', token);
	};

	usernameCheck = () => {
		const { pageNo, username, email, verificationErr } = this.state;
		axios({
			method: 'post',
			url: 'https://localhost:8888/user/checkUserDetails',
			data: {
				username: username,
				email: email,
			},
		})
			.then(res => {
				const resArray = res && res.data;
				if (resArray.length == 0) {
					console.log('username res', res);
					const newPageNo = pageNo + 1;
					this.setState({ pageNo: newPageNo });
					this.setState({ verificationErr: null });
				} else {
					const errorMsg = resArray[0];
					this.setState({ verificationErr: errorMsg });
					console.log('error res', res);
				}
			})
			.catch(({ response }) => {
				console.log('username error', response);
				const errorMsg = response && response.data && response.data.message;
				this.setState({ verificationErr: errorMsg }, () => {
					window.scrollTo(0, 0);
				});
			});
	};

	practitionerDetailCheck = () => {
		const { pageNo, verificationErr, email, abn, medicareProNum } = this.state;

		axios({
			method: 'post',
			url: 'https://localhost:8888/user/checkPracDetails',
			data: {
				ABN: abn,
				medicalProviderNum: medicareProNum,
			},
		})
			.then(res => {
				console.log('practitionerDetail res', res);
				const newPageNo = pageNo + 1;
				this.setState({ pageNo: newPageNo });
				this.setState({ verificationErr: null });
			})
			.catch(({ response }) => {
				console.log('practitionerDetail error', response);
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
		} = this.state;
		if (bundle == '') {
			console.log('only Subscription');
			formData.append('title', title);
			formData.append('password', newPassword);
			formData.append('fName', firstName);
			formData.append('lName', lastName);
			formData.append('username', username);
			formData.append('gender', gender);
			formData.append('email', email);
			formData.append('dob', dob);
			formData.append('ABN', abn);
			formData.append('pracType', pracType);
			formData.append('serviceProvided', serviceProvided);
			formData.append('medicalProviderNum', medicareProNum);
			formData.append('accBody', accreditedBodies);
			formData.append('businessName', businessName);
			formData.append('businessAddress', businessAddress);
			formData.append('profilePic', this.state.selectedImg, this.state.selectedImg.name);
		} else {
			console.log('Subscription + package');

			formData.append('title', title);
			formData.append('password', newPassword);
			formData.append('fName', firstName);
			formData.append('lName', lastName);
			formData.append('username', username);
			formData.append('gender', gender);
			formData.append('email', email);
			formData.append('dob', dob);
			formData.append('ABN', abn);
			formData.append('pracType', pracType);
			formData.append('serviceProvided', serviceProvided);
			formData.append('medicalProviderNum', medicareProNum);
			formData.append('accBody', accreditedBodies);
			formData.append('businessName', businessName);
			formData.append('businessAddress', businessAddress);
			formData.append('bundle', bundle);
			formData.append('stripeToken', stripeToken);
			formData.append('profilePic', this.state.selectedImg, this.state.selectedImg.name);
		}

		console.log(formData.values);
		axios
			.post('https://localhost:8888/user', formData)
			.then(res => {
				console.log('practitionerDetail res', res);
				const newPageNo = pageNo + 1;
				this.setState({ pageNo: newPageNo });
				this.setState({ verificationErr: null });
			})
			.catch(({ response }) => {
				console.log('practitionerDetail error', response);
				const errorMsg = response && response.data && response.data.message;
				this.setState({ verificationErr: errorMsg }, () => {
					window.scrollTo(0, 0);
				});
			});

		// const newPageNo = pageNo + 1;
		// this.setState({pageNo: newPageNo});
	};

	initialiseAgreement = agreement => {
		this.setState({ agreement: agreement });
		console.log(agreement);
	};
	agreementToggle = () => {
		console.log('before setState agreement', this.state.agreement);
		this.setState((prevState, props) => {
			return {
				agreement: !prevState.agreement,
			};
		});
		console.log('agrement', this.state.agreement);
	};

	previousPageHandler = () => {
		const { pageNo } = this.state;
		if (pageNo <= 0) {
			return;
		}
		const newPageNo = pageNo - 1;
		this.setState({ pageNo: newPageNo });
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
						console.log('Error: ');
				}
			}
		}
	};

	render() {
		let currentPage = null;
		let pagination = null;
		const {
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
			selectedImg,
			stripeToken,
			bundle,
			verificationErr,
			agreement,
			errors,
		} = this.state;
		switch (this.state.pageNo) {
			case 0:
				currentPage = (
					<div className={styles.Border}>
						<Row>
							<Col xs={1} md={2} lg={3} />
							<Col xs={10} md={8} lg={6}>
								<AccountPage
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
							</Col>
						</Row>
					</div>
				);
				pagination = (
					<Row>
						<Col sm={6} />
						<Col sm={6}>
							<a className={[buttons.btn, buttons.btngreen].join(' ')} onClick={this.nextPageHandler}>
								next
							</a>
						</Col>
					</Row>
				);
				break;
			case 1:
				currentPage = (
					<div className={styles.Border}>
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
							errors={errors}
							onChange={this.onChange}
							onClick={this.onInputClickHandler}
							onBlur={this.onBlur}
						/>
					</div>
				);
				pagination = (
					<Row>
						<Col sm={6}>
							<a className={[buttons.btn, buttons.btngreen].join(' ')} onClick={this.previousPageHandler}>
								prev
							</a>
						</Col>
						<Col sm={6}>
							<a className={[buttons.btn, buttons.btngreen].join(' ')} onClick={this.nextPageHandler}>
								next
							</a>
						</Col>
					</Row>
				);
				break;
			case 2:
				currentPage = (
					<div className={styles.Border}>
						<StripeProvider apiKey="pk_test_6ENTZj1Qk1DRjeqgLBVRyrCN">
							<Elements>
								<SubscriptionPaymentPage
									setToken={this.setToken}
									bundle={bundle}
									onChange={this.onChange}
									onClick={this.onInputClickHandler}
									next={this.nextPageHandler}
									prev={this.previousPageHandler}
								/>
							</Elements>
						</StripeProvider>
					</div>
				);
				pagination = (
					<Row>
						<Col sm={6}>
							<a className={[buttons.btn, buttons.btngreen].join(' ')} onClick={this.previousPageHandler}>
								prev
							</a>
						</Col>
						<Col sm={6}>
							<a className={[buttons.btn, buttons.btngreen].join(' ')} onClick={this.nextPageHandler}>
								next
							</a>
						</Col>
					</Row>
				);

				break;
			case 3:
				currentPage = (
					<div className={styles.Border}>
						<AgreementPage toggle={this.agreementToggle} setAgreement={this.initialiseAgreement} />
					</div>
				);
				pagination = (
					<Row>
						<Col sm={6}>
							<a className={[buttons.btn, buttons.btngreen].join(' ')} onClick={this.previousPageHandler}>
								prev
							</a>
						</Col>
						<Col sm={6}>
							<button
								className={[buttons.btn, buttons.btngreen].join(' ')}
								onClick={this.nextPageHandler}
								disabled={agreement}
							>
								confirm
							</button>
						</Col>
					</Row>
				);
				break;
			case 4:
				currentPage = (
					<div className={styles.Border}>
						<ConfirmationPage />
					</div>
				);
				break;
			default:
				currentPage = (
					<div className={styles.Border}>
						<AccountPage next={this.nextPageHandler} />
					</div>
				);
		}

		return (
			<Aux>
				<Grid>
					{verificationErr && <AlertBar componentType="danger">{verificationErr}</AlertBar>}
					<ProgressBar step={this.state.pageNo} />
					{currentPage}
					{pagination}
				</Grid>
			</Aux>
		);
	}
}

export default SignupForm;
