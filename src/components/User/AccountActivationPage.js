import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyEmail } from '../../actions/auth.actions';
import SuccessCheckMark from '../Recyclable/SuccessCheckMark';
import ErrorCrossMark from '../Recyclable/ErrorCrossMark';
import { Link } from 'react-router-dom';
import Button from '../Recyclable/Button';
import qs from 'query-string';

class AccountActivationPage extends Component {
	componentDidMount() {
		const parsed = qs.parse(this.props.location.search);
		this.props.verifyEmail(parsed.id);
	}

	render() {
		if (this.props.authState.isVerifyEmailSuccess) {
			console.log('success activation');
			return (
				<div className="container animated fadeInDown">
					<div className="login-container password-reset-container animated fadeInUp">
						<SuccessCheckMark />
						<p className="success">Your account has been activated successfully.</p>
						<p>Please login to use our service.</p>
						<Link to="/login">
							<Button id="login-button">Click here to login</Button>
						</Link>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container animated fadeInDown">
					<div className="login-container password-reset-container animated fadeInUp">
						<ErrorCrossMark />
						<p className="error">Invalid activation link</p>
						<p>
							Your link may have expired. Please contact us at{' '}
							<a href="healthscout321@gmail.com">healthscout321@gmail.com</a> to receive support.
						</p>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		authState: state.authentication,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		verifyEmail: token => dispatch(verifyEmail(token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountActivationPage);
