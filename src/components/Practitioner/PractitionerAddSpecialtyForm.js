import React from 'react';
import { connect } from 'react-redux';
import escapeRegexCharacters from '../Utilities/EscapeRegexCharacters';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import '../../../style/PractitionerAddSpecialtyForm.css';
// import AlertBar from '../Recyclable/AlertBar'
// import Button from '../Recyclable/Button';
import { ModalBody, ModalFooter, Button, AlertBar } from 'mdbreact';
import { addSpecialty, deleteSpecialty } from '../../actions/specialty.actions';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters

function getSuggestions(value, specialties) {
	const escapedValue = escapeRegexCharacters(value.trim());

	if (escapedValue === '') {
		return [];
	}

	const regex = new RegExp('^(' + escapedValue + '.*|.* ' + escapedValue + '.*)$', 'i');

	return specialties.filter(s => regex.test(s.specialtyName));
}

function getSuggestionValue(suggestion) {
	return suggestion.specialtyName;
}

function renderSuggestion(suggestion, { query }) {
	const matches = AutosuggestHighlightMatch(suggestion.specialtyName, query);
	const parts = AutosuggestHighlightParse(suggestion.specialtyName, matches);

	return (
		<span className="scrollable-menu">
			{parts.map((part, index) => {
				const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;

				return (
					<span className={className} key={index}>
						{part.text}
					</span>
				);
			})}
		</span>
	);
}

class PractitionerAddSpecialtyForm extends React.Component {
	constructor() {
		super();

		this.state = {
			value: '',
			suggestions: [],
		};
	}

	onSubmit = e => {
		e.preventDefault();
		this.props.addSpecialty(this.state.value, this.props.toggle);
	};

	renderInputComponent = inputProps => {
		return (
			<div className="col col-md-11">
				<input {...inputProps} />
			</div>
		);
	};

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue,
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value, this.props.specialtyState.pracTypeSpecialties),
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};

	renderError = () => {
		if (this.props.specialtyState.addSpecialtyError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{this.props.specialtyState.addSpecialtyError.data.message}
				</div>
			);
		return null;
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'Enter your specialties, separated by comma...',
			value,
			id: 'specialty-input',
			onChange: this.onChange,
			className: 'form-control',
			type: 'text',
		};

		return (
			<form onSubmit={this.onSubmit}>
				<ModalBody>
					{this.renderError()}
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						renderInputComponent={this.renderInputComponent}
						inputProps={inputProps}
					/>
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
		specialtyState: state.specialties,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addSpecialty: (specialty, cb) => dispatch(addSpecialty(specialty, cb)),
		deleteSpecialty: specialty => dispatch(deleteSpecialty(specialty)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerAddSpecialtyForm);
