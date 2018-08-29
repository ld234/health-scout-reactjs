import React from 'react';

export default function(props) {
	return (
		<div className="check_mark">
			<div className="sa-icon sa-success animate">
				<span className="sa-line sa-tip animateSuccessTip" />
				<span className="sa-line sa-long animateSuccessLong" />
				<div className="sa-placeholder" />
				<div className="sa-fix" />
			</div>
		</div>
	);
}
