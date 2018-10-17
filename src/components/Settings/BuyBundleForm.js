/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Options to buy a new connection bundle, using Stripe to get card token
 * Created: 24 Sep 2018
 * Last modified: 17 Oct 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
			apiKey: 'pk_test_MtzOuiItf07GsAJgk1AT5KeQ',
		};
	}

	componentDidMount() {
		const stripeJs = document.createElement('script');
		stripeJs.src = 'https://js.stripe.com/v3/';
		stripeJs.async = true;
		stripeJs.onload = () => {
			this.setState({
				stripe: window.Stripe(this.state.apiKey),
			});
		};
		document.body && document.body.appendChild(stripeJs);
	}
	togglePayment = bundle => {
		if (this.state.paymentToggle == true) {
			this.props.resetPayment();
		}
		this.setState((prevState, props) => {
			return {
				paymentToggle: !prevState.paymentToggle,
			};
		});
		if (bundle == 'premium') {
			this.setState({ price: 24.99 });
		}
		if (bundle == 'platinum') {
			this.setState({ price: 49.99 });
		}
		if (bundle == 'standard') {
			this.setState({ price: 19.99 });
		}
		this.setState({ bundle: bundle });
	};

	render() {
		const selectedPrice = this.state.price;
		return (
			<div className="sPaymentContainer">
				<h6>Connection Left: {this.props.userState.user.availableConnections}</h6>
				<div className="bundle">
					Standard Bundle
					<Button
						className="button"
						color="primary"
						onClick={() => {
							this.togglePayment('standard');
						}}
					>
						$19.99
					</Button>
				</div>
				<div className="bundle">
					Premium Bundle
					<Button
						className="button"
						color="primary"
						onClick={() => {
							this.togglePayment('premium');
						}}
					>
						$24.99
					</Button>
				</div>
				<div className="bundle">
					Platinum Bundle
					<Button
						className="button"
						color="primary"
						onClick={() => {
							this.togglePayment('platinum');
						}}
					>
						$49.99
					</Button>
				</div>
				<Modal className="addition-modal" isOpen={this.state.paymentToggle} toggle={this.togglePayment} centered>
					<ModalHeader toggle={this.togglePayment}>
						<i className="fas fa-credit-card" /> Payment {selectedPrice ? `$` + selectedPrice : null}
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
const mapStateToProps = state => {
	return {
		userState: state.userDetails,
	};
};
const mapDispatchToProps = {
	resetPayment: resetPayment,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BuyBundleForm);
