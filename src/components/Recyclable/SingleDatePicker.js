import 'react-dates/initialize';
import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import isBeforeDay from 'react-dates/lib/utils/isBeforeDay';
import isAfterDay from 'react-dates/lib/utils/isAfterDay';
import 'react-dates/lib/css/_datepicker.css';

export default class App extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			date: moment(),
		};
	}

	render() {
		return (
			<div>
				<SingleDatePicker
					isOutsideRange={day => isAfterDay(day, moment())}
					date={this.state.date} // momentPropTypes.momentObj or null
					onDateChange={date => {
						this.setState({ date });
						this.props.onChange(date);
					}} // PropTypes.func.isRequired
					focused={this.state.focused} // PropTypes.bool
					onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
					displayFormat="DD/MM/YYYY"
				/>
			</div>
		);
	}
}
