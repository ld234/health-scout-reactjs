import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'mdbreact';
import Timeline from '../Recyclable/Timeline';

class PractitionerProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            editModal: false,
            hoveredItem: null,
        };
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    toggleEditModal = (i) =>{
        this.setState({
            editModal: !this.state.editModal,
            hoveredItem: i,
        });
    }

    render(){
        return (
            <div>
                <div className="practitioner-profile-head row justify-content-between">
                    <div className="col col-md-8 profile-title">
                    <h4>{this.props.section}</h4>
                    </div>
                    <div className="col col-md-4 profile-button">
                        <Button id={this.props.buttonID} color="primary" className="button add-button" onClick={this.toggle}>
                            Add {this.props.for}
                        </Button>
                    </div>
                    <div className="horizontal-line"><hr/></div>
                </div>
                <Modal className="addition-modal" isOpen={this.state.modal} toggle={this.toggle} centered>
                    <ModalHeader toggle={this.toggle}>Add {this.props.for}</ModalHeader>
                    {React.createElement(this.props.addComponent,{toggle: this.toggle})}
                </Modal>
                
                <div id="practitioner-profile-body" className="row justify-content-between">
                    <Timeline
                        data={this.props.data} 
                        flag={this.props.flag} 
                        timeWrapper={this.props.timeWrapper} 
                        subtext={this.props.subtext}
                        desc={this.props.desc}
                        toggle={this.toggleEditModal}
                        for={this.props.for}
                    />
                </div>
                <Modal className="editing-modal" isOpen={this.state.editModal} toggle={this.toggleEditModal} centered>
                    <ModalHeader toggle={this.toggleEditModal}>Edit {this.props.for}</ModalHeader>
                    {React.createElement(this.props.editComponent,{toggle: this.toggleEditModal,hoveredItem: this.state.hoveredItem})}
                </Modal>
            </div>
        );
    }
}

export default PractitionerProfile;
