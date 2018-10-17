/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Progress bar component for registration
 * Created: 15 Jul 2018
 * Last modified: 9 Aug 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import './SignupStepProgressBar.css';
const SignupStepProgressBar = props => {
	const stepsText = ['Account Detail', 'Practioner Detail', 'Subscription', 'Agreement', 'Confirmation'];
	const stepsList = stepsText.map((stepName, i) => {
		return props.step >= i ? (
			<li key={i} className="active SignupSPBar-text">
				{stepName}
			</li>
		) : (
			<li key={i} className="grey-text">
				{stepName}
			</li>
		);
	});
	return <div className="ProgressBar">{stepsList}</div>;
};

export default SignupStepProgressBar;
