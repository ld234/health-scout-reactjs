import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'mdbreact';
import { setNewPassword } from '../../actions/setting.actions';
class UpdatePasswordForm extends React.Component {
	state = {
		oldPassword: '',
		newPassword: '',
		newPasswordConfirm: '',
		errors: {},
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

	onInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	validateForm() {
		var returnVal = true;
		const { newPassword, newPasswordConfirm } = this.state;
		if (_.isEmpty(newPassword)) {
			const newErr = _.merge(this.state.errors, { newPassword: '*New password required' });
			this.setState({ errors: newErr });
			console.log('empty:', newErr);
			returnVal = false;
		} else if (newPassword.length < 8) {
			const newErr = _.merge(this.state.errors, { newPassword: '*Password needs to have at least 8 characters' });
			this.setState({ errors: newErr });
			console.log('length:', this.state.errors);
			returnVal = false;
		} else if (!/\d/.test(newPassword)) {
			const newErr = _.merge(this.state.errors, { newPassword: '*Password needs to contain at least 1 digit' });
			this.setState({ errors: newErr });
			console.log('digit:', this.state.errors);
			returnVal = false;
		} else if (newPassword != newPasswordConfirm) {
			const newErr = _.merge(this.state.errors, { newPasswordConfirm: '*Password does not match' });
			this.setState({ errors: newErr });
			console.log('match:', this.state.errors);
			returnVal = false;
		}

		return returnVal;
	}

	onSubmit = e => {
		const { oldPassword, newPassword, newPasswordConfirm } = this.state;
		e.preventDefault();
		if (this.validateForm()) {
			let data = { oldPassword, newPassword, confirmPassword: newPasswordConfirm };
			this.props.setNewPassword(data);
		}
	};

	renderError = () => {
		let { isSetNewPasswordError, isSetNewPasswordSuccess } = this.props.settingState;
		if (isSetNewPasswordError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{isSetNewPasswordError}
				</div>
			);
		else if (isSetNewPasswordSuccess)
			return (
				<div className="alert alert-success alert-dismissible fade show animated fadeInUp" role="alert">
					Successfully changed password
				</div>
			);
		return null;
	};

	render() {
		return (
			<form className="change-pw-form" onSubmit={this.onSubmit}>
				{this.renderError()}
				<label htmlFor="password-input" className="grey-text">
					Old password
				</label>
				<input
					name="oldPassword"
					type="password"
					id="password-input"
					className="form-control"
					onChange={this.onInputChange}
					value={this.state.oldPassword}
					onBlur={this.onBlur}
				/>
				<label className="errorMsg clearfix">{this.state.errors.oldPassword}</label>

				<label htmlFor="new-password-input" className="grey-text">
					New password
				</label>
				<input
					name="newPassword"
					type="password"
					id="new-password-input"
					className="form-control"
					onChange={this.onInputChange}
					value={this.state.newPassword}
					onBlur={this.onBlur}
				/>
				<label className="errorMsg clearfix">{this.state.errors.newPassword}</label>

				<label htmlFor="password-confirm-input" className="grey-text">
					Confirm new password
				</label>
				<input
					name="newPasswordConfirm"
					type="password"
					id="password-confirm-input"
					className="form-control"
					onChange={this.onInputChange}
					value={this.state.newPasswordConfirm}
					onBlur={this.onBlur}
				/>
				<label className="errorMsg clearfix">{this.state.errors.newPasswordConfirm}</label>
				<div className="buttons-div">
					<Button className="button" color="primary" type="submit">
						Update password
					</Button>
				</div>
			</form>
		);
	}
}
const mapStateToProps = state => {
	return {
		clientState: state.clients,
		settingState: state.settingInfo,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setNewPassword: data => dispatch(setNewPassword(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdatePasswordForm);
