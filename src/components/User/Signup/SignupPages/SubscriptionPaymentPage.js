import React, { Component } from 'react';
import { Button } from 'mdbreact';
import pageCss from './SubscriptionPaymentPage.css';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';

class SubscriptionPaymentPage extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			selectedPackage: [
				{
					name: 'standard',
					default: 'SPcontainer SPcontainer1',
					classAttr: 'SPcontainer SPcontainer1',
				},
				{
					name: 'premium',
					default: 'SPcontainer SPcontainer2',
					classAttr: 'SPcontainer SPcontainer2',
				},
				{
					name: 'platinum',
					default: 'SPcontainer SPcontainer3',
					classAttr: 'SPcontainer SPcontainer3',
				},
				{
					name: '',
					default: 'SPcontainerSub SPcontainer4',
					classAttr: 'SPcontainerSub SPcontainer4 SPactiveSub',
				},
			],
			selected: 3,
			validCardNumber: false,
			validCardCvc: false,
			validCardExpiry: false,
			isEmptyCardNumber: true,
			isEmptyCardExpiry: true,
			isEmptyCardCvc: true,
			CardNumberError: '',
			CardCvcError: '',
			CardExpiryError: '',
		};
	}

	async handleSubmit() {
		if (
			this.state.selected != 3 &&
			this.state.validCardCvc &&
			this.state.validCardNumber &&
			this.state.validCardExpiry
		) {
			const result = await this.props.stripe.createToken();

			if (!result.token) {
				console.log('card error');
			} else {
				this.setState({ CardCvcError: '' });
				this.setState({ CardExpiryError: '' });
				this.setState({ CardNumberError: '' });
				this.props.setToken(result.token.id);
				console.log(result.token.id);
				this.props.setBundle(this.state.selectedPackage[this.state.selected].name);
				this.props.next();
			}
		} else if (this.state.selected == 3) {
			this.props.setBundle(this.state.selectedPackage[this.state.selected].name);
			this.props.next();
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
		console.log(changes);
		this.setState({ validCardNumber: changes.complete });
		this.setState({ isEmptyCardNumber: changes.empty });
	};
	onChangeCExpHandler = changes => {
		this.setState({ validCardExpiry: changes.complete });
		this.setState({ isEmptyCardExpiry: changes.empty });
		this.setState({});
	};
	onChangeCvcHandler = changes => {
		this.setState({ validCardCvc: changes.complete });
		this.setState({ isEmptyCardCvc: changes.empty });
		this.setState({});
	};

	onSelectHandler = selected => {
		let selectedPackage = this.state.selectedPackage;
		let newClassAttr;
		if (selected < 3) {
			this.setState({ selected });
			this.props.setBundle(this.state.selectedPackage[selected].name);
			newClassAttr = selectedPackage.map((bundle, i) => {
				return i == selected
					? (bundle.classAttr = bundle.default.concat(' SPactive'))
					: (bundle.classAttr = bundle.default);
			});
		} else if (selected == 3) {
			this.setState({ selected });
			this.props.setBundle(this.state.selectedPackage[selected].name);
			newClassAttr = selectedPackage.map((bundle, i) => {
				return i == 3
					? (bundle.classAttr = bundle.default.concat(' SPactiveSub'))
					: (bundle.classAttr = bundle.default);
			});
		} else {
			this.setState({ selected: -1 });

			newClassAttr = selectedPackage.map((bundle, i) => {
				return (bundle.classAttr = bundle.default);
			});
		}

		selectedPackage[0].classAttr = newClassAttr[0];
		selectedPackage[1].classAttr = newClassAttr[1];
		selectedPackage[2].classAttr = newClassAttr[2];
		selectedPackage[3].classAttr = newClassAttr[3];

		this.setState({ selectedPackage });
	};

	render() {
		let creditCard;
		this.state.selected != -1 && this.state.selected != 3
			? (creditCard = (
					<div className="SubOuterCreditCard">
						<div className="SubCreditCard">
							<div className="row">
								<label>
									Card holder name
									<input className="StripeElement SubCardHolderName" />
								</label>
							</div>
							<div className="row">
								<label>
									Card number
									<CardNumberElement className="SubCardNum" onChange={this.onChangeCNumHandler} />
								</label>
							</div>
							<div className="row">
								<label className="errorMsg">{this.state.CardNumberError}</label>
							</div>
							<div className="row">
								<label>
									Expiration date
									<CardExpiryElement className="SubCardExp" onChange={this.onChangeCExpHandler} />
								</label>
								<label>
									&nbsp;&nbsp;&nbsp;CVC
									<CardCVCElement className="SubCardCvc" onChange={this.onChangeCvcHandler} />
								</label>
							</div>
							<div className="row">
								<label className="errorMsg">{this.state.CardExpiryError}</label>
								<label className="errorMsg">{this.state.CardCvcError}</label>
							</div>
						</div>
					</div>
			  ))
			: null;

		return (
			<div className="SPContainer">
				<div className="row">
					<div className={this.state.selectedPackage[3].classAttr} onClick={() => this.onSelectHandler(3)}>
						Only Subscription
					</div>
				</div>
				<div className="row option">
					<div className="col">
						<h2>Or</h2>
					</div>
				</div>
				<div className="row">
					<div className="SPouter-container">
						<div className={this.state.selectedPackage[0].classAttr} onClick={() => this.onSelectHandler(0)}>
							<div className="SPinner_container">
								<div className="SPtitle">Basic Package</div>
								<div className="SPmain_number">9.99</div>
								<div className="SPcontainer_text">
									<div className="SPcontainer_text1" />
									<div className="SPcontainer_text2">10 Connections</div>
								</div>
							</div>
							<a>
								<span>Select</span>
							</a>
						</div>
						<div className={this.state.selectedPackage[1].classAttr} onClick={() => this.onSelectHandler(1)}>
							<div className="SPinner_container">
								<div className="SPtitle">Standard Package</div>
								<div className="SPmain_number">25.99</div>
								<div className="SPcontainer_text">
									<div className="SPcontainer_text1">Family</div>
									<div className="SPcontainer_text2">20 Connections</div>
								</div>
							</div>
							<a>
								<span>Select</span>
							</a>
						</div>
						<div className={this.state.selectedPackage[2].classAttr} onClick={() => this.onSelectHandler(2)}>
							<div className="SPinner_container">
								<div className="SPtitle">Premium Package</div>
								<div className="SPmain_number">50.99</div>
								<div className="SPcontainer_text">
									<div className="SPcontainer_text1">Business</div>
									<div className="SPcontainer_text2">30 Connections</div>
								</div>
							</div>
							<a>
								<span>Select</span>
							</a>
						</div>
					</div>
				</div>
				{creditCard}
				<br />
				<br />
				<br />
				<div className="row">
					<div className="col-sm-6">
						<Button className="btn btn-lg btn-block" color="blue" onClick={this.props.prev}>
							Prev
						</Button>
					</div>
					<div className="col-sm-6">
						<Button className="btn btn-lg btn-block" color="blue" onClick={this.handleSubmit}>
							Next
						</Button>
					</div>
				</div>
				;
			</div>
		);
	}
}

export default injectStripe(SubscriptionPaymentPage);
