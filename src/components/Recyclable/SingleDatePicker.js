/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: App Date Picker
 * Created: 13 Jul 2018
 * Last modified: 15 Jul 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import 'react-dates/initialize';
import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import isAfterDay from 'react-dates/lib/utils/isAfterDay';
import 'react-dates/lib/css/_datepicker.css';

export default class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		if (!this.props.date)
			this.state = {
				date: moment(),
			};
		else {
			this.state = {
				date: this.props.date,
			};
		}
		this.props.onChange(this.state.date);
	}

	render() {
		return (
			<div>
				<SingleDatePicker
					orientation="horizontal"
					numberOfMonths={1}
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
