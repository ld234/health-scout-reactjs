import React from 'react';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { Button } from 'mdbreact';
import { connect } from 'react-redux';
import Loading from '../Recyclable/LoadingPage';
import { getBundlePayment } from '../../actions/setting.actions';
import '../User/Signup/SignupPages/confirmationPage.css';

class PaymentModal extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			CardExpiryError: '',
			CardCvcError: '',
			CardNumberError: '',
			CardNamerror: '',
			validCardNumber: false,
			validCardExpiry: false,
			validCardCvc: false,
			error: '',
			bundle: this.props.bundle,
		};
	}

	async handleSubmit() {
		let pracUsername = this.props.authState.user.username;
		if (this.state.validCardCvc && this.state.validCardNumber && this.state.validCardExpiry) {
			const result = await this.props.stripe.createToken();

			if (!result.token) {
				this.setState({ error: 'Invalid card' });
			} else {
				this.setState({ CardCvcError: '' });
				this.setState({ CardExpiryError: '' });
				this.setState({ CardNumberError: '' });
				let data = { stripeToken: result.token.id, bundle: this.props.bundle, pracUsername };
				this.props.getBundlePayment(data);
			}
		} else {
			if (this.state.isEmptyCardCvc) {
				this.setState({ CardCvcError: '*Cvc required' });
			}
			if (this.state.isEmptyCardExpiry) {
				this.setState({ CardExpiryError: '*Expiry date required' });
			}
			if (this.state.isEmptyCardNumber) {
				this.setState({ CardNumberError: '*Card number required' });
			}
		}
	}
	onChangeCNumHandler = changes => {
		this.setState({ validCardNumber: changes.complete });
		this.setState({ isEmptyCardNumber: changes.empty });
	};
	onChangeCExpHandler = changes => {
		this.setState({ validCardExpiry: changes.complete });
		this.setState({ isEmptyCardExpiry: changes.empty });
	};
	onChangeCvcHandler = changes => {
		this.setState({ validCardCvc: changes.complete });
		this.setState({ isEmptyCardCvc: changes.empty });
	};

	onChangeCNameHandler = changes => {
		if (changes.target.value == '') {
			console.log('Empty');
			this.setState({ CardNamerror: '*Card holder name required' });
		} else {
			this.setState({ CardNamerror: '' });
		}
	};

	renderError() {
		let { error, isGetPaymentBundleError } = this.props.settingState;
		if (isGetPaymentBundleError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{isGetPaymentBundleError}
				</div>
			);
		else if (error)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{error}
				</div>
			);
		return null;
	}
	renderOutput() {
		let { isGetBundlePaymentPending, isGetBundlePaymentSuccess } = this.props.settingState;
		if (isGetBundlePaymentSuccess) {
			return (
				<div className="paymentSuccess">
					<svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
						<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
						<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
					</svg>
					<br />
					<p>Thank you for purchasing {this.props.bundle} bundle</p>
				</div>
			);
		} else if (isGetBundlePaymentPending) {
			return (
				<div className="loadingContainer">
					<Loading />
				</div>
			);
		} else {
			return (
				<div className="settingSubCreditCard">
					{this.renderError}
					<div className="row">
						<label>
							Card holder name
							<input className="StripeElement SubCardHolderName" onChange={this.onChangeCNameHandler} />
							<label className="errorMsg">{this.state.CardNamerror}</label>
						</label>
					</div>
					<div className="row cCard-number">
						<label>
							Card number
							<CardNumberElement className="SubCardNum" onChange={this.onChangeCNumHandler} />
							<label className="errorMsg">{this.state.CardNumberError}</label>
						</label>
					</div>
					<div className="row cCard-restDetail">
						<label>
							Expiration date
							<CardExpiryElement className="SubCardExp" onChange={this.onChangeCExpHandler} />
						</label>
						<label>
							&nbsp;&nbsp;&nbsp;CVC
							<CardCVCElement className="SubCardCvc" onChange={this.onChangeCvcHandler} />
							<label className="errorMsg">{this.state.CardExpiryError}</label>
							<label className="errorMsg">{this.state.CardCvcError}</label>
						</label>
					</div>
					<br />
					<br />

					<Button color="primary" className="btn-block" onClick={this.handleSubmit}>
						Pay
					</Button>
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderOutput()}</div>;
	}
}
const mapStateToProps = state => {
	return {
		authState: state.authentication,
		settingState: state.settingInfo,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getBundlePayment: token => dispatch(getBundlePayment(token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(injectStripe(PaymentModal));
