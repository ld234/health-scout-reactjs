import React from 'react';
import { Button } from 'mdbreact';
import './confirmationPage.css';

const ConfirmationPage = () => {
	return (
		<div className="comfirmation">
			<svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
				<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
				<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
			</svg>
			<h3>Thank you for Signing up to health scout</h3>

			<p>
				We have sent an email with an activation link to your email address. In order to complete the sign-up process,
				please click on the activation link and proceed to login
			</p>
		</div>
	);
};

export default ConfirmationPage;
