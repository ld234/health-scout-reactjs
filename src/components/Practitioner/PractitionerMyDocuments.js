import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'mdbreact';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PractitionerMyDocuments extends Component{
    constructor(props){
        super(props);
        this.state={
            addDocumentToggle :false,
            editModal: false,
            hoveredItem: null,
        };
}

    toggleAddDocument = () => {
        console.log("toggle", this.state.addDocumentToggle);
        this.setState((prevState, props)=>{
            return{
                addDocumentToggle : !prevState.addDocumentToggle,
            }
        });

    }
    renderDocuments(){
        return(
            <li  className="doc-item" >
                    <span className="doc-number"><i className="fas fa-file-pdf"></i></span>
                    <div className="doc-detail">
                        <span className="doc-name">asdf</span>
                        <span className="doc-desc">asdf</span>
                        <span className="doc-modification">asdf</span>
                    </div>
                    <span className="doc-modify" >
                        <i class="fas fa-edit"></i>
                    </span>
                    <span className="doc-delete" >
                        <i className="fas fa-trash-alt"></i>
                    </span>
            </li> 
        )
    }
    render(){
        console.log("mydocs");

        return(
            <div>
            <div className="practitioner-profile-head row justify-content-between">
                <div className="col col-md-8 profile-title">
                <h4>My Documents</h4>
                </div>
                <div className="col col-md-4 profile-button">
                    <Button id="button" color="primary" className="button add-button" onClick={this.toggleAddDocument} >
                        Add documents
                    </Button>
                </div>
                <div className="horizontal-line"><hr/></div>
                <div className="col col-md-12 myDocuments">
                <div className="mydocs-wrapper">
                <ul className="rolldown-list" id="myList">
                    <ReactCSSTransitionGroup
                        transitionName="specialtyFade"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                    </ReactCSSTransitionGroup>
                    {this.renderDocuments()}
                </ul>
                </div>
                </div>
                
            </div>
            
            <Modal className="addition-modal" isOpen={this.state.addDocumentToggle} toggle={this.toggleAddDocument} centered>
                    <ModalHeader toggle={this.toggleAddDocument}>Add Documents</ModalHeader>
                    {React.createElement(this.props.addComponent,{toggle: this.toggleAddDocument})}
            </Modal>
            </div>
        );
    }
}
export default PractitionerMyDocuments;