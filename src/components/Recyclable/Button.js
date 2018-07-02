import React from 'react';
export default function (props) {
	//console.log(props);
	return (
		<button id="button" className="btn btn-info btn-block login button" type="submit" >{props.buttonLabel}</button>
	)
}