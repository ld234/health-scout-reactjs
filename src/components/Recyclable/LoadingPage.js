/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Loading component
 * Created: 13 Jul 2018
 * Last modified: 15 Jul 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ import React from 'react';

export default function() {
	return (
		<div className="container">
			<div className="row">
				<div id="loader">
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="dot" />
					<div className="lading" />
				</div>
			</div>
		</div>
	);
}
