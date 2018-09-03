import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'mdbreact';

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

	renderError() {
		return null;
	}
	render() {
		return (
			<form className="change-pw-form">
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

export default UpdatePasswordForm;
