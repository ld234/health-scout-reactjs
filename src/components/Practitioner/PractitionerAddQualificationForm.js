/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Component displaying a form to add new qualification
 * Created: 1 Aug 2018
 * Last modified: 1 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'mdbreact';
import { addQualification } from '../../actions/qualification.actions';
import escapeRegexCharacters from '../Utilities/EscapeRegexCharacters';
import { connect } from 'react-redux';

class PractitionerAddQualificationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			degree: '',
			institution: '',
			description: '',
			graduateYear: '',
			modal: false,
			errors: {},
			error: null,
		};
	}

	onInputChange = e => {
		this.setState({ error: null, [e.target.name]: e.target.value });
	};

	handleDateChange = date => {
		this.setState({ date: date });
	};

	// Check the required fields
	validateForm = e => {
		e.preventDefault();
		let { degree, institution, description, graduateYear } = this.state;
		if (!(degree && institution && graduateYear)) {
			this.setState({ error: 'All fields are required.' });
		} else if (!escapeRegexCharacters(graduateYear).match('^[0-9]{4}$')) {
			this.setState({ error: 'Invalid year expression.' });
		} else {
			this.onSubmit();
		}
	};

	onSubmit = () => {
		let { degree, institution, description, graduateYear } = this.state;
		let x = {
			degree: degree.trim(),
			institution: institution.trim(),
			description: description.trim(),
			graduateYear: graduateYear.trim(),
		};

		this.props.addQualification(x, this.props.toggle);
	};

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
		let { addQualificationError } = this.props.qualificationState;
		// Error from the backend
		if (addQualificationError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{addQualificationError.data.message}
				</div>
			);
		// Validation error
		else if (this.state.error)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{this.state.error}
				</div>
			);
		return null;
	};

	render() {
		return (
			<form onSubmit={this.validateForm}>
				<ModalBody>
					{this.renderError()}
					<label htmlFor="degree-input" className="grey-text">
						Degree
					</label>
					<input
						name="degree"
						type="text"
						id="degree-input"
						className="form-control"
						onChange={this.onInputChange}
						value={this.state.degree}
						onBlur={this.onBlur}
					/>
					<label className="errorMsg clearfix">{this.state.errors.degree}</label>
					<label htmlFor="institution-input" className="grey-text">
						Institution
					</label>
					<input
						name="institution"
						type="text"
						id="institution-input"
						className="form-control"
						onChange={this.onInputChange}
						value={this.state.institution}
						onBlur={this.onBlur}
					/>
					<label className="errorMsg clearfix">{this.state.errors.institution}</label>
					<label htmlFor="year-input" className="grey-text">
						Year
					</label>
					<input
						name="graduateYear"
						type="text"
						id="graduate-year-input"
						className="form-control"
						onChange={this.onInputChange}
						value={this.state.graduateYear}
						onBlur={this.onBlur}
					/>
					<label className="errorMsg clearfix">{this.state.errors.graduateYear}</label>
					<label htmlFor="qualification-description-input" className="grey-text">
						Brief description
					</label>
					<div className="qualification-description-wrapper">
						<textarea
							maxLength="255"
							name="description"
							type="text"
							id="qualification-description-input"
							className="form-control"
							onChange={this.onInputChange}
							value={this.state.description}
							onBlur={this.onBlur}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button className="button" color="primary" type="submit">
						Add
					</Button>
				</ModalFooter>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		qualificationState: state.qualifications,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addQualification: (newQualification, successCb) => dispatch(addQualification(newQualification, successCb)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerAddQualificationForm);
