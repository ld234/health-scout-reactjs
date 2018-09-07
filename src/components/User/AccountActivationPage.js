import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyEmail } from '../../actions/auth.actions';
import SuccessCheckMark from '../Recyclable/SuccessCheckMark';
import ErrorCrossMark from '../Recyclable/ErrorCrossMark';
import { Link } from 'react-router-dom';
import { Button } from '../Recyclable/Button';
import qs from 'query-string';

class AccountActivationPage extends Component {
	componentDidMount() {
		const parsed = qs.parse(this.props.location.search);
		this.props.verifyEmail(parsed.id);
	}

	render() {
		if (this.props.authState.isVerifyEmailSuccess)
			return (
				<div className="container">
					<div className="login-container password-reset-container">
						<SuccessCheckMark />
						<p className="success">Successfully activated account</p>
						<Link to="/login" style={{ textDecoration: 'none' }}>
							<Button>Click here to login"</Button>
						</Link>
					</div>
				</div>
			);
		else
			return (
				<div className="container">
					<div className="login-container">
						<ErrorCrossMark />
						<p className="error">Invalid activation link</p>
						<p>Your link may have expired. Please register your account again to receive a new activation link.</p>
					</div>
				</div>
			);
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
