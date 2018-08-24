import React from 'react';
import './SignupStepProgressBar.css';
const SignupStepProgressBar = props => {
	const stepsText = ['Account Detail', 'Practioner Detail', 'Subscription', 'Agreement', 'Confirmation'];
	const stepsList = stepsText.map((stepName, i) => {
		return props.step >= i ? (
			<li key={i} className="active">
				{stepName}
			</li>
		) : (
			<li key={i} />
		);
	});
	return <div className="ProgressBar">{stepsList}</div>;
};

export default SignupStepProgressBar;
