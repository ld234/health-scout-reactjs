import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from '../Recyclable/SingleDatePicker';
import {
	addConsultation,
	setAddConsultationSuccess,
	setAddConsultationError,
} from '../../actions/consultation.actions';
import { Button } from 'mdbreact';
import _ from 'lodash';

class ClientNewConsultationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			consultDate: '',
			summary: '',
			intervention: '',
			errors: {},
			error: null,
		};
	}

	onInputChange = e => {
		this.setState({ error: null, [e.target.name]: e.target.value });
	};

	onDateChange = date => {
		this.setState({ consultDate: date });
	};

	validateForm = e => {
		e.preventDefault();
		const { title, consultDate, summary, intervention } = this.state;
		const fields = ['title', 'consultDate', 'summary', 'intervention'];
		if (!fields.every(field => !_.isEmpty(this.state[field]))) {
			this.setState({ error: 'All fields are required.' });
		} else {
			this.props.addConsultation(
				{
					title,
					consultDate,
					summary,
					intervention,
					patientUsername: this.props.clientState.currentClient.patientUsername,
				},
				() => {
					this.props.update();
					this.clear();
				}
			);
		}
	};

	clear = () => {
		this.setState({
			title: '',
			consultDate: '',
			summary: '',
			intervention: '',
			errors: {},
			error: null,
		});
	};

	onFocus = event => {
		this.props.setAddConsultationSuccess(false);
		this.props.setAddConsultationError(null);
	};

	componentDidMount() {
		this.props.setAddConsultationSuccess(false);
	}

	onBlur = event => {
		if (_.isEmpty(event.target.value)) {
			const newErr = _.merge(this.state.errors, { [event.target.name]: '*field required' });
			this.setState({ errors: newErr });
		} else {
			const newErr = _.merge(this.state.errors, { [event.target.name]: '' });
			this.setState({ errors: newErr });
		}
	};

	renderError = () => {
		let { addConsultationError } = this.props.consultationState;
		if (addConsultationError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{addConsultationError}
				</div>
			);
		else if (this.state.error)
			return (
				<div className="clearfix">
					<div className="clearfix alert alert-danger animated fadeInUp">{this.state.error}</div>
				</div>
			);
		return null;
	};

	renderSuccess = () => {
		let { isAddConsultationSuccess } = this.props.consultationState;
		if (isAddConsultationSuccess)
			return (
				<div className="clearfix">
					<div className="clearfix alert alert-success animated fadeInUp">Consultation saved successfully.</div>
				</div>
			);
		return <div />;
	};

	render() {
		return (
			<form onSubmit={this.validateForm} className="client-consultation-form animated fadeIn">
				{this.renderError()}
				{this.renderSuccess()}
				<div className="client-fields row">
					<div className="col col-md-3 client-field">
						<label htmlFor="title-input" className="grey-text">
							Consultation Date
						</label>
						<DatePicker
							name="consultDate"
							id="consultation-date-input"
							onChange={this.onDateChange}
							onBlur={this.onBlur}
						/>
						<label className="errorMsg clearfix">{this.state.errors.consultDate}</label>
					</div>
					<div className="col col-md-9 client-field clearfix">
						<label htmlFor="title-input" className="grey-text">
							Consultation Title
						</label>
						<input
							name="title"
							type="text"
							id="title-input"
							className="form-control"
							placeholder="The main objective of the consultation"
							onChange={this.onInputChange}
							onBlur={this.onBlur}
							onFocus={this.onFocus}
							value={this.state.title}
						/>
						<label className="errorMsg clearfix">{this.state.errors.title}</label>
					</div>
				</div>
				<label htmlFor="summary-input" className="grey-text">
					Consultation Summary
				</label>
				<textarea
					name="summary"
					type="text"
					id="summary-input"
					rows="5"
					className="form-control"
					placeholder="A brief summary of what has been discussed during the consultation..."
					onChange={this.onInputChange}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					value={this.state.summary}
				/>
				<label className="errorMsg">{this.state.errors.summary}</label>
				<label htmlFor="intervention-input" className="grey-text">
					Intervention
				</label>
				<textarea
					name="intervention"
					type="text"
					id="intervention-input"
					rows="5"
					className="form-control"
					placeholder="Instructions to patients after consultation..."
					onChange={this.onInputChange}
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					value={this.state.intervention}
				/>
				<div className="buttons-div">
					<Button className="button" color="primary" type="submit">
						Add consultation
					</Button>
					<button onClick={this.clear} type="button" className="btn btn-danger">
						Clear
					</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		consultationState: state.consultations,
		clientState: state.clients,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addConsultation: (newConsultation, cb) => dispatch(addConsultation(newConsultation, cb)),
		setAddConsultationSuccess: bool => dispatch(setAddConsultationSuccess(bool)),
		setAddConsultationError: err => dispatch(setAddConsultationError(err)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClientNewConsultationForm);
