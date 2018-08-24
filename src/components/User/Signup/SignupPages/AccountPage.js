import React from 'react';
import Aux from '../../../../hoc/ReactAux';
import { Row, Col } from 'react-bootstrap';
const AccountPage = props => {
	let inputClassNameAtt = 'form-control has-warning';
	let inputClassError = ' is-invalid';
	return (
		<Aux>
			<div>
				<div className="form-group">
					<label htmlFor="email" className="grey-text">
						Email
					</label>
					<input
						type="email"
						id="email"
						className={props.errors.email ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
						name="email"
						value={props.email}
						onChange={props.onChange}
						onBlur={props.onBlur}
						placeholder="john.smith@example.com"
					/>
					<label className="errorMsg">{props.errors.email}</label>
				</div>
				<div className="form-group">
					<label htmlFor="username" className="grey-text">
						Username
					</label>
					<input
						type="text"
						id="username"
						className={props.errors.username ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
						name="username"
						value={props.username}
						onChange={props.onChange}
						onBlur={props.onBlur}
						placeholder="username"
					/>
					<label className="errorMsg">{props.errors.username}</label>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className={props.errors.newPassword ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
						name="newPassword"
						value={props.newPassword}
						onChange={props.onChange}
						onBlur={props.onBlur}
						placeholder="password"
					/>
					<label className="errorMsg">{props.errors.newPassword}</label>
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<input
						type="password"
						className={props.errors.confirmPassword ? inputClassNameAtt.concat(inputClassError) : inputClassNameAtt}
						name="confirmPassword"
						value={props.confirmPassword}
						onChange={props.onChange}
						onBlur={props.onBlur}
						placeholder="confirm password"
					/>
					<label className="errorMsg">{props.errors.confirmPassword}</label>
				</div>
			</div>
		</Aux>
	);
};

export default AccountPage;
