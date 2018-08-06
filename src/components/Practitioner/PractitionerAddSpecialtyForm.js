import React from 'react';
import {connect} from 'react-redux';
import escapeRegexCharacters from '../Utilities/EscapeRegexCharacters';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import '../../../style/PractitionerAddSpecialtyForm.css';
import Button from '../Recyclable/Button';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters

function getSuggestions(value,specialties) {
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
      suggestions: []
    };    
  }
  
  renderInputComponent = (inputProps)  => {
	return (
		<form>
			<div className="row justify-content-between">
                    <div className="col col-md-8 specialty-input">
						<input {...inputProps} />
                    </div>
                    <div className="col col-md-4">
                        <Button id={this.props.buttonID} type="submit" color="primary" className="button add-button" onClick={this.toggle}>
                            Add specialty
                        </Button>
                    </div>
             </div>
		</form>);
  }
  
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value,this.props.specialtyState.pracTypeSpecialties)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Enter your specialties, separated by comma...",
      value,
	  id: "specialty-input",
      onChange: this.onChange,
	  className: "form-control",
    };

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
		renderInputComponent={this.renderInputComponent}
        inputProps={inputProps}
      />
    );
  }
}

const mapStateToProps = (state)=>{
	return{
		specialtyState: state.specialties,
	}
}

export default connect(mapStateToProps)(PractitionerAddSpecialtyForm);