import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'mdbreact';
import SingleDatePickerWrapper from '../Recyclable/SingleDatePicker';

class PractitionerAddQualificationForm extends Component{
    constructor(props){
        super(props);
    }

    handleDateChange = () => {

    }

    render(){
        return (
            <form onSubmit={this.props.someAction}>
                <ModalBody>
                    <label htmlFor="business-name" className="grey-text">Business name</label>
                    <input type="text" id="business-name" className="form-control" />
                    <label htmlFor="position" className="grey-text">Institution</label>
                    <input type="text" id="institution-input" className="form-control" />
                    <label htmlFor="year-input" className="grey-text">Year</label>
                    <input type="text" id="year-input" className="form-control" />
                    <label htmlFor="description-input" className="grey-text">Brief description</label>
                    <textarea type="text" id="description-input" className="form-control" />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Close</Button>{' '}
                    <Button className="button" color="primary">Add</Button>
                </ModalFooter>
            </form>
        );
    }
}

export default PractitionerAddQualificationForm;