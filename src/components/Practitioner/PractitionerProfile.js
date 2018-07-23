import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'mdbreact';

class PractitionerProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false
        };
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    render(){
        return (
            <div>
                <div className="practitioner-profile-head" className="row justify-content-between">
                    <div className="col col-md-8 profile-title">
                    <h4>{this.props.section}</h4>
                    </div>
                    <div className="col col-md-4 profile-button">
                        <Button id={this.props.buttonID} color="primary" className="button add-button" onClick={this.toggle}>
                            {this.props.modalTitle}
                        </Button>
                    </div>
                    <div className="horizontal-line"><hr/></div>
                </div>
                <Modal className="addition-modal" isOpen={this.state.modal} toggle={this.props.toggle} centered>
                    <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
                    {React.cloneElement(this.props.children,{toggle: this.toggle})}
                </Modal>
                <div id="practitioner-profile-body" className="row justify-content-between">
                    {this.props.bodyComponent}
                </div>
            </div>
        );
    }
}

export default PractitionerProfile;
