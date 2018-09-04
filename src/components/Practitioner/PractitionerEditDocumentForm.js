import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button } from 'mdbreact';
import AlertBar from '../Recyclable/AlertBar';
import { editDocument, deleteDocument } from '../../actions/document.action';
import { connect } from 'react-redux';

class PractitionerEditDocumentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldTitle: this.props.data.title,
			oldDescription: this.props.data.description,
			oldFileName: this.props.data.title + '.pdf',
			title: this.props.data.title,
			description: this.props.data.description,
			chooseFile: null,
			fileName: this.props.data.title + '.pdf',
			error: null,
		};
	}

	onInputChange = e => {
		this.setState({ error: null, [e.target.name]: e.target.value });
		if (e.target.name == 'chooseFile') {
			if (e.target.value.match('pdf$')) {
				let inputName = e.target.files[0].name;
				inputName = inputName.substring(0, Math.min(inputName.length, 30));
				this.setState({ fileName: inputName });
				this.setState({ chooseFile: e.target.files[0] });
			} else {
				if (typeof e.target.files[0] === 'undefined') {
					this.setState({ fileName: 'No File Chosen...' });
				} else {
					this.setState({ error: 'Invalid File Type', fileName: 'No File Chosen...' });
				}
			}
		}
	};

	handleDelete = e => {
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		console.log('deleting document');
		this.props.deleteDocument(this.state.oldTitle, this.props.pos, this.props.toggle);
	};

	validateForm = e => {
		e.preventDefault();
		let { oldDescription, oldFileName, oldTitle, chooseFile, description, title } = this.state;
		if (oldDescription == description && oldFileName == fileName && oldTitle == title) {
			this.setState({ error: 'Details have not been changed.' });
		} else {
			this.onSubmit();
		}
	};
	onSubmit = () => {
		let { chooseFile, description, title, oldTitle } = this.state;
		console.log('choose file', chooseFile);
		let formData = new FormData();
		formData.append('oldTitle', oldTitle);
		formData.append('newTitle', title);
		formData.append('description', description);
		formData.append('file', chooseFile, title);
		this.props.editDocument(formData, this.props.pos, this.props.toggle);
	};

	renderError = () => {
		let { editDocumentError } = this.props.documentState;
		console.log(editDocumentError);
		if (editDocumentError)
			return (
				<div className="alert alert-danger alert-dismissible fade show animated fadeInUp" role="alert">
					{editDocumentError}
				</div>
			);
		if (this.state.error)
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
					<label htmlFor="title" className="grey-text">
						Title
					</label>
					{/* <input name="title" type="text" id="doc-title" className="form-control is-invalid"  */}
					<input
						name="title"
						type="text"
						id="doc-title"
						className="form-control"
						onChange={this.onInputChange}
						value={this.state.title}
					/>
					<label htmlFor="doc-description" className="grey-text">
						Description
					</label>
					<textarea
						maxLength="150"
						name="description"
						type="text"
						id="doc-description"
						className="form-control"
						onChange={this.onInputChange}
						value={this.state.description}
					/>
					<div className="file-upload">
						<div className="file-select">
							<div className="file-select-button" id="fileName">
								Choose File
							</div>
							<div className="file-select-name " id="noFile">
								{this.state.fileName}
							</div>
							<input type="file" name="chooseFile" id="chooseFile" onChange={this.onInputChange} />
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="btn btn-danger" onClick={this.handleDelete}>
						Delete
					</Button>
					<Button className="button" color="primary" type="submit">
						Update
					</Button>
				</ModalFooter>
			</form>
		);
	}
}
const mapStateToProps = state => {
	return {
		documentState: state.documents,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteDocument: (title, pos, successCb) => dispatch(deleteDocument(title, pos, successCb)),
		editDocument: (x, pos, successCb) => dispatch(editDocument(x, pos, successCb)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PractitionerEditDocumentForm);
