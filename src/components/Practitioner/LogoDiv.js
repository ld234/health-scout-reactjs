import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
	return (
		<Link to="/">
			<li className="item-menu" id="side-nav-logo">
				<span>
					<img src={'../../../style/img/healthscout_logo.png'} height="48px" />
				</span>
				<span className="side-logo-text">HealthScout</span>
			</li>
		</Link>
	);
}
