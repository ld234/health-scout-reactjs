import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'mdbreact';
// import SingleDatePickerWrapper from '../Recyclable/SingleDatePicker';
import AlertBar from '../Recyclable/AlertBar';
import { addDocument } from '../../actions/document.action';
import escapeRegexCharacters from '../Utilities/EscapeRegexCharacters';
import { connect } from 'react-redux';

class PractitionerAddDocumentForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            title: '',
            description: '',
            chooseFile:null,
            fileName: "No File Chosen...",
            error: null,
        }
    }

    onInputChange = (e) => {
        this.setState({ error: null, [e.target.name]: [e.target.value] });
        if(e.target.name =="chooseFile"){
          
            if( e.target.value.match("pdf$")){
                let inputName= e.target.files[0].name;
                inputName=inputName.substring(0, Math.min(inputName.length, 30));
                this.setState({fileName: inputName});
            }
            else{
                if(typeof e.target.files[0] === 'undefined'){
                    this.setState({fileName: "No File Chosen..."});
                }
                else{
                    this.setState({error:"Invalid File Type",fileName: "No File Chosen..."})
                }
            }
        }
        
    }
  

    validateForm = (e) =>{
        e.preventDefault();
        let { chooseFile, description, title} = this.state;
        if (! (chooseFile && title && description)) {
            this.setState({error: 'All fields are required.'})
        }
        else {
            this.onSubmit();
        }

    }
    onSubmit = () => {
        let { chooseFile, description, title} = this.state;
        let x = {
			title:title,       
			description:description,
			file:chooseFile};
        this.props.addDocument(x, this.props.toggle);
    }

    renderError = () =>{
		let {addDocumentError} = this.props.documentState;
		if (addDocumentError)
			return (
            <div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
                {addDocumentError.data.message}
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
                    <label htmlFor="title" className="grey-text">Title</label>
                    {/* <input name="title" type="text" id="doc-title" className="form-control is-invalid"  */}
                    <input name="title" type="text" id="doc-title" className="form-control" 
                        onChange={this.onInputChange} value={this.state.degree} />
                    <label htmlFor="doc-description" className="grey-text">Description</label>
                    <textarea maxLength="150" name="description" type="text" id="doc-description" className="form-control" 
                        onChange={this.onInputChange} value={this.state.description} />
                    <div className="file-upload">
                        <div className="file-select" >
                            <div className="file-select-button" id="fileName">Choose File</div>
                            <div className="file-select-name " id="noFile">{this.state.fileName}</div> 
                            <input type="file" name="chooseFile" id="chooseFile" onChange={this.onInputChange}/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                    <Button className="button" color="primary" type="submit">Add</Button>
                </ModalFooter>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        documentState: state.documents,
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        addDocument: (newDocument,successCb) => dispatch(addDocument(newDocument,successCb)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PractitionerAddDocumentForm);
