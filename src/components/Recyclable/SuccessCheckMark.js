import React from 'react';

// export default function(props) {
// 	return (
// 		<div className="check_mark">
// 			<div className="sa-icon sa-success animate">
// 				<span className="sa-line sa-tip animateSuccessTip" />
// 				<span className="sa-line sa-long animateSuccessLong" />
// 				<div className="sa-placeholder" />
// 				<div className="sa-fix" />
// 			</div>
// 		</div>
// 	);
// }

export default function(props) {
	return (
		<div>
			<svg className="error-cross-mark" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
				<circle
					className="path circle"
					fill="none"
					stroke="#73AF55"
					strokeWidth="6"
					strokeMiterlimit="10"
					cx="65.1"
					cy="65.1"
					r="62.1"
				/>
				<polyline
					className="path check"
					fill="none"
					stroke="#73AF55"
					strokeWidth="6"
					strokeLinecap="round"
					strokeMiterlimit="10"
					points="100.2,40.2 51.5,88.8 29.8,67.5 "
				/>
			</svg>
		</div>
	);
}
