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
					num: 1,
					name: 'standard',
					title: 'Subscription + Standard bundle',
					price: 10.0,
					desc: 'asdflhaosfha',
				},
				{
					num: 2,
					name: 'premium',
					title: 'Subscription + Premium bundle',
					price: 15.0,
					desc: 'asdflhaosfha',
				},
				{
					num: 3,
					name: 'platinum',
					title: 'Subscription + Platinum bundle',
					price: 20.0,
					desc: 'asdflhaosfha',
				},
				{
					num: 4,
					name: 'subscription',
					title: 'Subscription only',
					price: 5.0,
					desc: 'asdflhaosfha',
				},
			],
			selected: 4,
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
			this.state.selected != 4 &&
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
				this.props.next();
			}
		} else if (this.state.selected == 4) {
			console.log('next sub');
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
		this.setState({ selected });
		this.props.setBundle(this.state.selectedPackage[selected - 1].name);
		console.log('sending bundle:', this.state.selectedPackage[selected - 1].name);
	};

	render() {
		let cart = (
			<div>
				<h5>
					<i className="fas fa-shopping-cart" /> Cart information
				</h5>
				<div className="SubOuterCreditCard">
					<div className="RselectedInfo">
						<h6>{this.state.selectedPackage[this.state.selected - 1].title}</h6>
						<h6>${this.state.selectedPackage[this.state.selected - 1].price.toFixed(2)}</h6>
					</div>
				</div>
			</div>
		);
		let creditCard =
			this.state.selected != 4 ? (
				<div>
					<h5>
						<i className="fas fa-credit-card" /> Enter Payment information
					</h5>
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
				</div>
			) : null;

		let packages = this.state.selectedPackage.map(pkg => {
			return this.state.selected == pkg.num ? (
				<div className="rPlanCard" key={pkg.num}>
					{' '}
					<div className="rAccordion rActive">
						<span className="rATitle">{pkg.title}</span>
						<span className="rAPrice">${pkg.price.toPrecision(2)}</span>
					</div>
					<div className="rPanel">{pkg.desc}</div>
				</div>
			) : (
				<div key={pkg.num}>
					<div className="rAccordion" onClick={() => this.onSelectHandler(pkg.num)}>
						<span className="rATitle">{pkg.title}</span>
						<span className="rAPrice">${pkg.price.toPrecision(2)}</span>
					</div>
				</div>
			);
		});
		return (
			<div className="subscriptionPageContainer">
				<div className="row">
					<div className="col-md-8">
						<h5>Select your plan</h5>
						<div className="SPContainer">{packages}</div>
						{/* <div className="row">
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
				</div> */}
					</div>
					<div className="col-md-4">
						{cart}
						<br />
						{creditCard}
					</div>
				</div>
				<div className="row">
					<div className="col-md-3" />
					<div className="col-md-3">
						<Button className="btn btn-block signupBtn" color="blue" onClick={this.props.prev}>
							Prev
						</Button>
					</div>
					<div className="col-md-3">
						<Button className="btn btn-block signupBtn" color="blue" onClick={this.handleSubmit}>
							Next
						</Button>
					</div>
					<div className="col-md-3" />
				</div>
			</div>
		);
	}
}

export default injectStripe(SubscriptionPaymentPage);
