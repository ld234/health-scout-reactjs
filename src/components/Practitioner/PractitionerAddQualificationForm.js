import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'mdbreact';
// import SingleDatePickerWrapper from '../Recyclable/SingleDatePicker';
import AlertBar from '../Recyclable/AlertBar';
import { addQualifcation } from '../../actions/qualification.actions';
import { connect } from 'react-redux';

class PractitionerAddQualificationForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            degree:'',
            institution: '',
            description:'',
            graduateYear: '',
            modal: false,
            error: null
        }
    }

    onInputChange = (e) => {
        this.setState({ error: null, [e.target.name]: e.target.value });
    }

    handleDateChange = (date) => {
        this.setState({date: date});
    }

    validateForm = (e) =>{
        e.preventDefault();
        let { degree, institution, description, graduateYear} = this.state;
        if (! (degree && institution && description && graduateYear)) {
            this.setState({error: 'All fields are required.'})
        }
        else if (!graduateYear.match('[0-9]{4}')) {
            this.setState({error: 'Invalid year expression.'})
        }
        else {
            this.onSubmit();
        }

    }

    onSubmit = () => {
        let { degree, institution, description, graduateYear } = this.state;
        let x = {degree,institution,description,graduateYear};
        console.log(x);
        
        this.props.addQualification(x, this.props.toggle);
    }

    renderError = () =>{
		let {addQualificationError} = this.props.qualificationState;
		if (addQualificationError)
			return (
            <div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
                {addQualificationError.data.message}
            </div>)
		else if (this.state.error)
            return (
                <div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
                    {this.state.error}
                </div>);
		return null;
	}

    render(){
        return (
            <form onSubmit={this.validateForm}>
                <ModalBody>
                    {this.renderError()}
                    <label htmlFor="degree-input" className="grey-text">Degree</label>
                    <input name="degree" type="text" id="degree-input" className="form-control" 
                        onChange={this.onInputChange} value={this.state.degree} />
                    
                    <label htmlFor="institution-input" className="grey-text">Institution</label>
                    <input name="institution" type="text" id="institution-input" className="form-control" 
                        onChange={this.onInputChange} value={this.state.institution} />
                    
                    <label htmlFor="year-input" className="grey-text">Date acquired</label>
                    <input name="graduateYear" type="text" id="graduate-year-input" className="form-control" 
                        onChange={this.onInputChange} value={this.state.graduateYear} />
                    <label htmlFor="description-input" className="grey-text">Brief description</label>
                    <textarea name="description" type="text" id="description-input" className="form-control" 
                        onChange={this.onInputChange} value={this.state.description} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Close</Button>{' '}
                    <Button className="button" color="primary" type="submit">Add</Button>
                </ModalFooter>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        qualificationState: state.qualifications,
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        addQualification: (newQualification,successCb) => dispatch(addQualifcation(newQualification,successCb)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (PractitionerAddQualificationForm);