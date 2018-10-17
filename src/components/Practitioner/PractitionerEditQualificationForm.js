/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Component displaying a form to edit current qualification.
 * Created: 13 Aug 2018
 * Last modified: 12 Sep 2018
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button } from 'mdbreact';
import { editQualification, deleteQualification } from '../../actions/qualification.actions';
import { connect } from 'react-redux';

class PractitionerEditQualificationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldDegree: this.props.qualificationState.qualifications[this.props.hoveredItem].degree,
			oldInstitution: this.props.qualificationState.qualifications[this.props.hoveredItem].institution,
			oldDescription: this.props.qualificationState.qualifications[this.props.hoveredItem].description,
			oldGraduateYear: this.props.qualificationState.qualifications[this.props.hoveredItem].graduateYear,
			oldDescription: this.props.qualificationState.qualifications[this.props.hoveredItem].description,
			degree: this.props.qualificationState.qualifications[this.props.hoveredItem].degree,
			institution: this.props.qualificationState.qualifications[this.props.hoveredItem].institution,
			description: this.props.qualificationState.qualifications[this.props.hoveredItem].description,
			graduateYear: this.props.qualificationState.qualifications[this.props.hoveredItem].graduateYear,
			modal: false,
			error: null,
			errors: {},
		};
	}

	onInputChange = e => {
		this.setState({ error: null, [e.target.name]: e.target.value });
	};

	handleDateChange = date => {
		this.setState({ date: date });
	};

	validateForm = e => {
		e.preventDefault();
		let { degree, institution, description, graduateYear } = this.state;
		if (!(degree && institution && graduateYear)) {
			this.setState({ error: 'All fields are required.' });
		} else if (!graduateYear.toString().match('[0-9]{4}')) {
			this.setState({ error: 'Invalid year expression.' });
		} else if (
			degree === this.state.oldDegree &&
			institution === this.state.oldInstitution &&
			description === this.state.oldDescription &&
			graduateYear === this.state.oldGraduateYear
		) {
			this.setState({ error: 'Details have not been changed.' });
		} else {
			this.onSubmit();
		}
	};

	onSubmit = () => {
		let { degree, institution, description, graduateYear } = this.state;
		let { oldDegree, oldInstitution, oldGraduateYear } = this.state;
		let newQ = {
			newDegree: degree,
			newInstitution: institution,
			description,
			newGraduateYear: graduateYear,
			position: this.props.hoveredItem,
		};
		let oldQ = { oldDegree, oldInstitution, oldGraduateYear };
		this.props.editQualification(oldQ, newQ, this.props.toggle, this.props.hoveredItem);
	};

	renderError = () => {
		let { editQualificationError } = this.props.qualificationState;
		if (editQualificationError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{editQualificationError}
				</div>
			);
		else if (this.state.error)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{this.state.error}
				</div>
			);
		return null;
	};

	handleDelete = ev => {
		ev.preventDefault();
		ev.stopPropagation();
		ev.nativeEvent.stopImmediatePropagation();
		let { degree, institution, graduateYear } = this.state;
		this.props.deleteQualification({ degree, institution, graduateYear }, this.props.hoveredItem, this.props.toggle);
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
					/>
					<label className="errorMsg clearfix">{this.state.errors.institution}</label>
					<label htmlFor="year-input" className="grey-text">
						Graduate year
					</label>
					<input
						name="graduateYear"
						type="text"
						id="graduate-year-input"
						className="form-control"
						onChange={this.onInputChange}
						value={this.state.graduateYear}
					/>
					<label className="errorMsg clearfix">{this.state.errors.graduateYear}</label>
					<label htmlFor="description-input" className="grey-text">
						Brief description
					</label>
					<div className="qualification-description-wrapper">
						<textarea
							maxLength="255"
							name="description"
							type="text"
							id="description-input"
							className="form-control"
							onChange={this.onInputChange}
							value={this.state.description}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<button onClick={this.handleDelete} type="button" className="btn btn-danger">
						Delete
					</button>
					<Button className="button" color="primary" type="submit">
						Save
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
		editQualification: (oldQ, newQ, cb, pos) => dispatch(editQualification(oldQ, newQ, cb, pos)),
		deleteQualification: (oldQ, position, cb) => dispatch(deleteQualification(oldQ, position, cb)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerEditQualificationForm);
