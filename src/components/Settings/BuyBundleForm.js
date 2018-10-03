import React from 'react';
import { Button, Modal, ModalHeader } from 'mdbreact';
import PaymentModal from './PaymentModal';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { resetPayment } from '../../actions/setting.actions';
import { connect } from 'react-redux';

class BuyBundleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bundle: '',
			price: 0,
			paymentToggle: false,
			apiKey: 'pk_test_OUqtPerqAmIdMxbK8PagM3Ng',
		};
	}

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
	togglePayment = bundle => {
		console.log('toggle', this.state.paymentToggle);
		if (this.state.paymentToggle == true) {
			console.log('[calling resetPayment]');
			this.props.resetPayment();
		}
		this.setState((prevState, props) => {
			return {
				paymentToggle: !prevState.paymentToggle,
			};
		});
		this.setState({ bundle: bundle });
	};
	render() {
		return (
			<div className="sPaymentContainer">
				<h6>Connection Left:</h6>
				<div className="bundle">
					Package one
					<Button
						className="button"
						color="primary"
						onClick={() => {
							this.togglePayment('standard');
						}}
					>
						Hello
					</Button>
				</div>
				<div className="bundle">
					Package two
					<Button
						className="button"
						color="primary"
						onClick={() => {
							this.togglePayment('premium');
						}}
					>
						Hello
					</Button>
				</div>
				<div className="bundle">
					Package three
					<Button
						className="button"
						color="primary"
						onClick={() => {
							this.togglePayment('platinum');
						}}
					>
						Hello
					</Button>
				</div>
				<Modal className="addition-modal" isOpen={this.state.paymentToggle} toggle={this.togglePayment} centered>
					<ModalHeader toggle={this.togglePayment}>
						<i className="fas fa-credit-card" /> Payment
					</ModalHeader>
					<StripeProvider apiKey={this.state.apiKey}>
						<Elements>
							<PaymentModal bundle={this.state.bundle} toggle={this.togglePayment} />
						</Elements>
					</StripeProvider>
				</Modal>
			</div>
		);
	}
}

const mapDispatchToProps = {
	resetPayment: resetPayment,
};

export default connect(
	null,
	mapDispatchToProps
)(BuyBundleForm);
